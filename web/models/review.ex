defmodule Hypeapp.Review do
  use Hypeapp.Web, :model

  schema "reviews" do
    field :review, :string
    belongs_to :user, Hypeapp.User #remove this, and reference the vote_id.

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:review])
    |> validate_required([:review])
    |> validate_length(:review, min: 1, max: 140)
  end
end
