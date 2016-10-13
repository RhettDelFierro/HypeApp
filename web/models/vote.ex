defmodule Hypeapp.Vote do
  use Hypeapp.Web, :model
  #can use yelp_id and user_id to get
  schema "votes" do
    field :yelp_id, :string, null: false
    belongs_to :user, Hypeapp.User
    belongs_to :vote_type, Hypeapp.VoteType

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:yelp_id])
    |> validate_required([:yelp_id])
  end
end
