defmodule Hypeapp.PlaceChannel do
  use Hypeapp.Web, :channel
  require Logger
  alis Phoenix.Presence

  # def join("place:" <> place_id, payload, socket) do
  #   authorize(payload, fn ->
  #     {:ok, socket}
  #   end)
  # end

  def join("place:" <> place_id, _params, socket) do
    send self(). :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    Presence.track(socket, socket.assigns.user_id || socket.assigns.uuid,
      %{online_at: :os.system_time(:milli_seconds)}
    )

    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (place:lobby).
  def handle_in("shout", payload, socket) do
    Logger.debug "#{inspect payload}"
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
