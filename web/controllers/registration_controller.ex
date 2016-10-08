defmodule Hypeapp.RegistrationController  do
  @moduledoc """
    New user controller.
  """
  use Hypeapp.Web, :controller

  alias Hypeapp.{Repo, User}

  plug :scrub_params, "user" when action in [:create]

  @doc """
    New user creation. route: /api/v1/registrations POST request.
  """

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    #Check the changeset being built with the user params and User.changeset/2
    case Repo.insert(changeset) do
      {:ok, user} ->
        # encode_and_sign/2 dishes out the jwt and sends it through request body
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :token)

        conn
        |> put_status(:created)
        |> render(Hypeapp.SessionView, "show.json", jwt: jwt, user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Hypeapp.RegistrationView, "error.json", changeset: changeset)
    end
  end
end
