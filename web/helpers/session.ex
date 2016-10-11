defmodule Hypeapp.Session do
  @moduledoc """
    helpers to authenticate the use for Hypeapp.SessionController.
  """
  alias Hypeapp.{Repo, User}

  # for SessionController :create
  def authenticate(%{"email" => email, "password" => password}) do
    user = Repo.get_by(User, email: String.downcase(email))
    IO.inspect(email)
    case check_password(user, password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> Comeonin.Bcrypt.dummy_checkpw()
      _ -> Comeonin.Bcrypt.checkpw(password, user.encrypted_password)
    end
  end
end
