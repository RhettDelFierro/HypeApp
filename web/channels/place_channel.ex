defmodule Hypeapp.PlaceChannel do
  @moduledoc """
    In the SPA, each review will have a places:place_id "room".
  """
  use Hypeapp.Web, :channel
  require Logger
  alias Phoenix.Presence

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
    
    #push the current present state to the user:
    push socket, "presence_state", Presence.list(socket)
    #Track the user with some metadata to indicate when they're online:
    Presence.track(socket, socket.assigns.id || socket.assigns.uuid,
      %{online_at: inspect(:os.timestamp()), device: "browser"}
    )
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
