defmodule Hypeapp.Review do
  use Hypeapp.Web, :model

  schema "reviews" do
    field :review, :string
    belongs_to :user, Hypeapp.User
    belongs_to :place, Hypeapp.Place

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:review])
    |> validate_required([:review])
    |> cast_assoc(:user)
    |> cast_assoc(:places)
    |> validate_length(:review, min: 1, max: 140)
  end

  # def join_reviews(query, col) do
  #    query |> join(:inner, [q], r in Review, q.^col === r.^col)
  # end
  def join_reviews(query, col) do
     query |> join(:inner, [q], r in assoc(q, ^col))
  end
end
