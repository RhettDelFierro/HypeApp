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
      #I do not think cast_assoc is right here. It needs params too.
      |> cast_assoc(:user)
      |> cast_assoc(:vote_type)
      |> cast_assoc(:places)
  end

  def get_votes(place_id) do
     __MODULE__ |> where([v], v.place_id == ^place_id)
  end

  def get_recent_votes(query) do
    query
      |> where([v], v.place_id > ago(-1, "hour"))
  end

  def join_votes_and_reviews(place_id) do
     query |> join(:inner, [v], r in Review, v.place_id === r.place_id)
  end

  def get_votes_and_reviews(query) do
    query |> order_by([v,r], asc: v.inserted_at) 
  end

  def get_recent_feed(query) do
    quer |> select([v,r], {v.user_id, })
  end


  def recent_feed(place_id) do
     from v in __MODULE__,
      join: r in Review, on: v.place_id == ^place_id > ago(-1, "hour")
      order_by: [dsc: :inserted_at]],

      from c in Comment,
  join: p in Post, on: c.post_id == p.id,
  select: {p.title, c.text}
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
