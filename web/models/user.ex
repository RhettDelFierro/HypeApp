defmodule Hypeapp.User do
  use Hypeapp.Web, :model

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:first_name, :last_name, :email, :encrypted_password])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:first_name, min: 1, max: 20)
    |> validate_length(:last_name, min: 1, max: 20)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> validate_required([:first_name, :last_name, :email, :password)
    |> unique_constraint(:email, message: "Email already taken")
  end

  def registration_changeset(model, params \\ %{}) do

  end
end
