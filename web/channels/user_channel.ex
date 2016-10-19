defmodule Hypeapp.UserChannel do
  use Hypeapp.Web, :channel
  require Logger

  # user_id is passed in through socket.channel() in usersFunctions.js
  def join("users:" <> user_id, payload, socket) do
    # authorize(payload, fn ->
    #   {:ok, socket}
    # end)
    current_user_id = socket.assigns.id

   if String.to_integer(user_id) == current_user_id do
     {:ok, socket}
   else
     {:error, %{reason: "Invalid user"}}
   end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (user:lobby).
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
