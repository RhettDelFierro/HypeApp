defmodule Hypeapp.VoteType do
  use Hypeapp.Web, :model

  schema "vote_types" do
    field :vote_type, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:vote_type])
    |> validate_required([:vote_type])
    |> unique_constraint(:vote_type)
  end
end
