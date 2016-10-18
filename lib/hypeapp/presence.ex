defmodule Hypeapp.Presence do
  use Phoenix.Presence, otp_app: :hypeapp,
                        pubsub_server: Hypeapp.PubSub
end
