defmodule Hypeapp.Vote do
  use Hypeapp.Web, :model

  schema "votes" do
    field :yelp_id, :string, null: false
    field :user_id, :int, null: false
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
