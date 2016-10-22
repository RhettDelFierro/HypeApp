defmodule Hypeapp.Vote do
  use Hypeapp.Web, :model
  #can use yelp_id and user_id to get
  alias Hypeapp.Review
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


    def recent_feed(place_id) do
       from v in __MODULE__,
        where: v.place_id == ^place_id > ago(-1, "hour")

        order[by: [asc: :inserted_at]]

    end

    def check_trending(place_id) do
       from v in __MODULE__,
        where: v.place_id == ^place_id >
         ago(-1, "hour")
        select: count(:id)
    end

    #TEST THIS OUT.
    # def check_tranding(place_id) do
    #   #different way, maybe call in the place_channel instead:
    #   Repo.aggregate(__MODULE__, :count, v.place_id == ^place_id > ago(-1, "hour"))
    # end

    def recent_feed_combine(place_id) do
       from v in __MODULE__,
        where: v.place_id == ^place_id,
        join: r in Review,
        where: v.place_id == r.place_id,
        order[by: [asc: :inserted_at]]

    end


end
