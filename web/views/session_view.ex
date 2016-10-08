defmodule Hypeapp.SessionView do
  use Hypeapp.Web, :view

  # authentication succeeds.
  # will send back the jwt and user object to the client in response body.
  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user
    }
  end

  # authentication fails.
  # will send back error object to client in response body. Params are _
  def render("error.json", _) do
    %{error: "Invalid email or password"}
  end
end
