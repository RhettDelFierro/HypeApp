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
    |> assoc_constraint(:user)
    |> assoc_constraint(:place)
    |> validate_length(:review, min: 1, max: 140)
  end

  # def join_reviews(query, col) do
  #    query |> join(:inner, [q], r in Review, q.^col === r.^col)
  # end
  def join_reviews(query, col) do
     query |> join(:inner, [_,q], r in assoc(q, ^col))
  end
end
