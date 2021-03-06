 defmodule Hypeapp.UserSocket do
  use Phoenix.Socket

  alias Hypeapp.{GuardianSerializer}

  channel "place:*", Hypeapp.PlaceChannel
  channel "users:*", Hypeapp.UserChannel
  channel "home:*", Hypeapp.HomeChannel
  ## Channels
  # channel "room:*", Hypeapp.RoomChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # no token sent, anonymous user:
  def connect(%{"anonymous_user" => uuid}, socket) do
    socket = socket
      |> assign(:uuid, uuid)
    {:ok, socket}
  end

  #Pattern match: When there is a token being sent:
  def connect(%{"token" => token}, socket) do
    #If this all passes, only autheted users can connect through socket to
    #the app
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case GuardianSerializer.from_token(claims["sub"]) do
          {:ok, user} ->
            socket = socket
              |> assign(:id, user.id)
              |> assign(:email, user.email)
              |> assign(:first_name, user.first_name)
              |> assign(:last_name, user.last_name)
            {:ok, socket}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
  end

  #Pattern match: No token being sent -> error.
  def connect(_params, socket), do: :error

  #used to identify a given connection.
  #After a connection is established the id function
  #will be called with the socket's state
  #return value is the id of that connection.

  #going to let anonymous users into the channel.
  #we'll take care of whether they could post or not (bae)
  def id(_socket), do: nil

end
