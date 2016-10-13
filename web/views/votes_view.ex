defmodule Hypeapp.VotesView do
  use Hypeapp.Web, :view

  def render("index.json", %{votes: votes}) do
    %{data: render_many(votes, Hypeapp.VotesView, "votes.json")}
  end

  def render("show.json", %{votes: votes}) do
    %{data: render_one(votes, Hypeapp.VotesView, "votes.json")}
  end

  def render("votes.json", %{votes: votes}) do
    %{id: votes.id,
      vote_type_id: votes.vote_type_id}
  end
end
