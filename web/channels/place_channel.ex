defmodule Hypeapp.PlaceChannel do
  @moduledoc """
    In the SPA, each review will have a places:place_id "room".
  """
  use Hypeapp.Web, :channel
  require Logger
  alias Hypeapp.Presence

  # def join("place:" <> place_id, payload, socket) do
  #   authorize(payload, fn ->
  #     {:ok, socket}
  #   end)
  # end

  def join("place:" <> place_id, _params, socket) do
    send self(), :after_join
    {:ok, socket}
  end

  def join(_other, _params) do
    {:error, "This place does not exist."}
  end

  def handle_info(:after_join, socket) do
    #handle anon_user logic here and set as metadata?
    id = socket.assigns.id || socket.assigns.uuid
    #Track the user with some metadata to indicate when they're online:
    Presence.track(socket, id, %{
      online_at: inspect(:os.timestamp()),
      device: "browser"
    })

    #push the current present state to the user:
    #Presence.list means "give me all the users on this socket's topic (place:place_id)"
    push socket, "presence_state", Presence.list(socket)
    # Don't need a reply:
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (place:lobby).
  def handle_in("review:new", review, socket) do
    Logger.debug "#{inspect review}"
    broadcast! socket, "review:new", %{
      user: "#{socket.assigns.first_name} #{socket.assigns.last_name}",
      body: review,
      #timestamp: :os.timestamp()
    }
    {:noreply, socket}
  end

  def handle_in("vote:new", vote, socket) do
    Logger.debug "#{inspect vote}"
    broadcast! socket, "vote:new", %{
      user: "#{socket.assigns.first_name} #{socket.assigns.last_name}",
      body: vote,
      timestamp: :os.timestamp()
    }
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
