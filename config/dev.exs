use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :hypeapp, Hypeapp.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [node: ["node_modules/webpack/bin/webpack.js", "--watch", "--color"]]


# Watch static and templates for browser reloading.
config :hypeapp, Hypeapp.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :hypeapp, Hypeapp.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "hypeapp_dev",
  hostname: "localhost",
  pool_size: 10

config :hypeapp, Yelp,
  client_id: System.get_env("YELP_APP_ID"),
  client_secret: System.get_env("YELP_APP_SECRET")

config :hypeapp, Hypeapp.LayoutView,
  api_key: System.get_env("GOOGLE_JAVASCRIPT_KEY")
