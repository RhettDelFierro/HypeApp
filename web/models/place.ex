defmodule Hypeapp.Place do
  use Hypeapp.Web, :model

  schema "places" do
    field :yelp_id, :string
    field :zip_code, :string
    has_many :votes, Hypeapp.Vote
    has_many :reviews, Hypeapp.Review

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:yelp_id, :zip_code])
    |> validate_required([:yelp_id, :zip_code])
    |> cast_assoc(:vote)
    |> cast_assoc(:review)
    |> unique_constraint(:yelp_id)
  end
end
