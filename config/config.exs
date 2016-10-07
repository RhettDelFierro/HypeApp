# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :hypeapp,
  ecto_repos: [Hypeapp.Repo]

# Configures the endpoint
config :hypeapp, Hypeapp.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "yxSNS3uj4Ta8tqkoDM1WtiJpYgfmBO/YAYx7/ErVd1f4K72v0NEH68CwARo7H00N",
  render_errors: [view: Hypeapp.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Hypeapp.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"