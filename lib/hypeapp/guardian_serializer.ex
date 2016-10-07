defmodule PhoenixTrello.GuardianSerializer do
  @moduledocs """
    This is a module that will tell Guardian how to encode
    and decode the user into and out of the token
  """
  @behaviour Guardian.Serializer
  #alias Hypeapp.Repo
  #alias Hypeapp.User
  alias Hypeapp.{Repo, User}

  #pattern matching:
  def for_token(user = %User{}), do: { :ok, "User:#{user.id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token("User:" <> id), do: { :ok, Repo.get(User, String.to_integer(id)) }
  def from_token(_), do: { :error, "Unknown resource type" }
end
