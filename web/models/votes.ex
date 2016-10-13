defmodule Hypeapp.Votes do
  use Hypeapp.Web, :model

  schema "votes" do
    belongs_to :vote_type, Hypeapp.VoteType

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [])
    |> validate_required([])
  end
end
