defmodule Hypeapp.Vote do
  use Hypeapp.Web, :model
  #can use yelp_id and user_id to get
  schema "votes" do
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
      |> cast_assoc(:user)
      |> cast_assoc(:vote_type)
      |> cast_assoc(:places)
  end
end
