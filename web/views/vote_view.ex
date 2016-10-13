defmodule Hypeapp.VoteView do
  use Hypeapp.Web, :view

  def render("index.json", %{votes: votes}) do
    %{data: render_many(votes, Hypeapp.VoteView, "vote.json")}
  end

  def render("show.json", %{vote: vote}) do
    %{data: render_one(vote, Hypeapp.VoteView, "vote.json")}
  end

  def render("vote.json", %{vote: vote}) do
    %{id: vote.id,
      vote_type_id: vote.vote_type_id,
      yelp_id: vote.yelp_id}
  end
end
