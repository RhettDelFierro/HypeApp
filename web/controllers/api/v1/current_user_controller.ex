defmodule Hypeapp.CurrentUserController do
  @moduledoc """
    When client refreshes, we want to return authenticated user's data.
    (keep them logged on after refresh).
  """
  use Hypeapp.Web, :controller
  # checks if there is a previously verified token and handle the
  # request with the :unauthenticated function of the SessionController if not.
  # makes sure user is authenticated to handle secured resources.
  plug Guardian.Plug.EnsureAuthenticated, handler: Hypeapp.SessionController

  def show(conn, _) do

    user = Guardian.Plug.current_resource(conn)
    IO.inspect user
    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end
end
