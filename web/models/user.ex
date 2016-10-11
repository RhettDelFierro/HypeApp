defmodule Hypeapp.User do
  use Hypeapp.Web, :model

  #Poison is Phoenix's default JSON library. We will only return the specified
  #fields when we render a user.
  @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :email]}

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `model (a struct)` and `params`.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:first_name, :last_name, :email, :encrypted_password])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:first_name, min: 1, max: 20)
    |> validate_length(:last_name, min: 1, max: 20)
    |> validate_required([:first_name, :last_name, :email])
    |> unique_constraint(:email, message: "Email already taken")
  end

  def registration_changeset(model, params) do
    model
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 6, max: 100)
    |> validate_confirmation(:password, message: "Password does not match")
    |> generate_encrypted_password()
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      # All of the above in the changeset() function passed (is valid),
      #then we'll store the encrypted password on the changet into the db.
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      # If the changeset/2 function doesn't pass all checks, it will return
      # the original changeset and render the error messages to the user.
      _ ->
        current_changeset
    end
  end
end
