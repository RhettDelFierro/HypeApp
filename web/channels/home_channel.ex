defmodule Hypeapp.HomeChannel do
  use Hypeapp.Web, :channel
  require Logger

  def join("home:" <> zip_code, payload, socket) do
      {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_info(:after_join, socket) do
    socket
      |> track_presence

    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (home:lobby).
  # This will actually be done in the yelp controller.
  def handle_in("trending:new", payload, socket) do
    broadcast socket, "trending:new", payload
    {:noreply, socket}
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

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
