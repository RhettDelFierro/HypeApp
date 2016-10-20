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

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (home:lobby).
  # This will actually be done in the yelp controller.
  def handle_in("trending:new", payload, socket) do
    broadcast socket, "trending:new", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
