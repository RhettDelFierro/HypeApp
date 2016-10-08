defmodule Hypeapp.SessionController do
  @moduledoc """
    Standard user login through send form data.
  """
  use Hypeapp.Web, :controller

  # scrub_params: Ensure the required key exists ("session") for :create.
  # Change empty values from the map in params with the required key to nil
  # HTML forms don't have the concept of nil, so every time blank input
  # is send through the form, it arrives as an empty string to our application.
  # this plug helps us to set it to nil rather than a blank space so we know
  # there was was a blank entry rather than it going in as a blank string.
  # In short, it checks and transforms any empty string into nil for any data
  # inside the "session" parameter. This keeps our data consistent and uniform.
  # %{"session" => %{"name" => "foo", "age" => ""}} -> age is nil instead of "".
  plug :scrub_params, "session" when action in [:create]

  # Routes to /api/v1/sessions -> POST request to sign-in.
  def create(conn, %{"session" => session_params}) do

    #check helper: user is authenticated, send back jwt if they are.
    case Hypeapp.Session.authenticate(session_params) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render("show.json", jwt: jwt, user: user)

      :error ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json")
    end
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(Hypeapp.SessionView, "forbidden.json", error: "Not Authenticated")
  end

end
