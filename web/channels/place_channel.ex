defmodule Hypeapp.PlaceChannel do
  @moduledoc """
    In the SPA, each review will have a places:place_id "room".
  """
  use Hypeapp.Web, :channel
  require Logger
  alias Hypeapp.{
    Presence,
    Place,
    Repo,
    Review,
    ReviewView,
    User,
    Vote,
    VoteView}

  # def join("place:" <> place_id, payload, socket) do
  #   authorize(payload, fn ->
  #     {:ok, socket}
  #   end)
  # end

  def join("place:" <> yelp_id, %{"zip_code" => zip_code}, socket) do
    send self(), :after_join

    place_id = check_and_set_place(yelp_id, zip_code)

    {:ok, assign(socket,:place_id, place_id)}
  end

  def join(_other, _params) do
    {:error, "This place does not exist."}
  end

  def handle_info(:after_join, socket) do
    socket
      |> track_presence
      |> after_join_feed

    {:noreply, socket}
  end

  def handle_in(event, params, socket) do
    place = Repo.get_by(Place, socket.assigns.place_id)
    handle_in(event, params, place, socket)
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (place:lobby).
  def handle_in("review:new", review, place, socket) do

    Logger.debug "#{inspect review}"
    broadcast! socket, "review:new", %{
      id: socket.assigns.id,
      user: "#{socket.assigns.first_name} #{socket.assigns.last_name}",
      body: review,
      type: "review",
      timestamp: :os.system_time(:milli_seconds)
    }
    {:noreply, socket}
  end

  #Here's the thing, there is a difference between channel callbacks and persistency.
  def handle_in("vote:new", payload, place, socket) do
    Logger.debug "#{inspect vote}"
    vote = build_vote(place)

    case Repo.insert(vote) do
       {:ok, vote} ->
         broadcast! socket, "vote:new", %{
           user: "#{socket.assigns.first_name} #{socket.assigns.last_name}",
           body: payload.vote_type,
           type: "vote",
           timestamp: :os.system_time(:milli_seconds)
         }

         # check for tending.
         count = get_recent(socket)
         if count >= 10 do
           Hypeapp.Endpoint.broadcast! "home:" <> place.zip_code, "trending:new",
            %{
             body: payload.coordinates,
             timestamp: :os.system_time(:milli_seconds)
            }
         end

         {:noreply, socket}
        {:error, changeset} ->
          {:reply, {:error, %{errors: changeset}}, socket}
    end

  end

  defp get_recent(socket) do
    place = socket.place_id
      |> Vote.get_full_feed
      |> Vote.get_votes_from(-1, "hour")
      |> select([v], count(v.id))
      |> Repo.aggregate(:count, :id)
    place
  end

  defp build_vote(model) do
    vote = build_assoc(model, :votes)
    user = Repo.get(User, %{"id" => socket.assigns.id} )
    build_assoc(user, :votes, Map.from_struct vote)
  end

  defp after_join_feed(socket) do
    # right now sending a list of structs that contain both votes and reviews for a user.
     feed = socket.assigns.place_id
      |> Vote.get_full_feed
      |> User.join_users(:user)
      # |> select([v,r,u], %{
      |> select([v,u], %{
          first_name: u.first_name,
          last_name: u.last_name,
          review: v.review,
          vote_type: v.vote_type_id,
          timestamp: v.inserted_at
          })
      |> Repo.all

      push socket, "join_feed", %{data: feed}
      socket
  end

  defp track_presence(socket) do
    #handle anon_user logic here and set as metadata?
    id = socket.assigns.id || socket.assigns.uuid
    #push the current present state to the user:
    #Presence.list means "give me all the users on this socket's topic (place:place_id)"
    push socket, "presence_state", Presence.list(socket)
    #Track the user with some metadata to indicate when they're online:
    Presence.track(socket, id, %{
      online_at: :os.system_time(:milli_seconds),
      device: "browser"
    })
    socket
  end

  defp check_and_set_place(yelp_id, zip_code) do

    case Repo.get_by(Place, %{yelp_id: yelp_id}) do
      %{id: id} ->
        id
      nil ->
        changeset = Place.changeset(%Place{
              yelp_id: yelp_id,
              zip_code: zip_code
            })
          |> Repo.insert!
        Ecto.Changeset.get_field(changeset, :id)
    end

  end


  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
