defmodule Hypeapp.PlaceChannel do
  @moduledoc """
    In the SPA, each review will have a places:place_id "room".
  """
  use Hypeapp.Web, :channel
  require Logger
  alias Hypeapp.{
    Presence,
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

  def join("place:" <> place_id, _params, socket) do
    socket
      |> assign(:place, place_id)
      |> track_presence
      |> after_join_feed

    send self(), :after_join
    {:ok, socket}
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

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (place:lobby).
  def handle_in("review:new", review, socket) do

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
  def handle_in("vote:up", vote, socket) do
    Logger.debug "#{inspect vote}"

    vote = Repo.insert_or_update! %Vote{
      user_id: socket.assigns.id,
      vote_type_id: 5
    }

    broadcast! socket, "vote:new", %{
      id: socket.assigns.id,
      user: "#{socket.assigns.first_name} #{socket.assigns.last_name}",
      body: "has voted up!",
      type: "vote",
      timestamp: :os.system_time(:milli_seconds)
    }
    {:noreply, socket}
  end

  def handle_in("vote:down", vote, socket) do
    Logger.debug "#{inspect vote}"
    broadcast! socket, "vote:new", %{
      id: socket.assigns.id,
      user: "#{socket.assigns.first_name} #{socket.assigns.last_name}",
      body: "has voted down!",
      type: "vote",
      timestamp: :os.system_time(:milli_seconds)
    }
    {:noreply, socket}
  end

  def after_join_feed(socket) do
    # right now sending a list of structs that contain both votes and reviews for a user.
     feed = socket.topic
      |> Vote.get_votes
      |> Review.join_reviews(:place_id)
      |> User.join_users(:user_id)
      |> select([v,r,u], %{
          first_name: u.first_name,
          last_name: u.last_name,
          review: r.review,
          place_id: v.place_id,
          timestamp: v.inserted_at
          })

      push socket, "join_feed", %{
        data: feed
      }
  end

  defp track_presence(socket) do
    #handle anon_user logic here and set as metadata?
    id = socket.assigns.id || socket.assigns.uuid
    #Track the user with some metadata to indicate when they're online:
    Presence.track(socket, id, %{
      online_at: :os.system_time(:milli_seconds),
      device: "browser"
    })
    #push the current present state to the user:
    #Presence.list means "give me all the users on this socket's topic (place:place_id)"
    push socket, "presence_state", Presence.list(socket)
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
