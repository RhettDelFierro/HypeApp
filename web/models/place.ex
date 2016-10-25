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
    |> cast_assoc(:votes)
    |> cast_assoc(:reviews)
    |> unique_constraint(:yelp_id)
  end

  def find_place(query,yelp_id) do
    query |> where([q], q.yelp_id == ^yelp_id)
  end
end