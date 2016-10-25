defmodule Hypeapp.Vote do
  use Hypeapp.Web, :model
  #can use yelp_id and user_id to get
  alias Hypeapp.Review
  schema "votes" do
    field :review, :string
    belongs_to :user, Hypeapp.User
    belongs_to :vote_type, Hypeapp.VoteType
    belongs_to :place, Hypeapp.Place

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.

  """
  def changeset(struct, params \\ %{}) do
    struct
      #I do not think cast_assoc is right here. It needs params too.
      |> cast(params, [:review])
      |> validate_length(:review, min: 1, max: 140)
      |> assoc_constraint(:places)
      |> assoc_constraint(:users)
      |> assoc_constraint(:vote_type)
  end

  def get_full_feed(place_id) do
     __MODULE__ |> where([v], v.place_id == ^place_id)
  end

  # we'll use this to trend.
  def get_votes_from(query, num, intv) do
    query
      |> where([v], v.place_id > ago(^num, ^intv))
  end

end
