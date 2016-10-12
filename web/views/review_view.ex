defmodule Hypeapp.ReviewView do
  use Hypeapp.Web, :view

  def render("index.json", %{reviews: reviews}) do
    %{data: render_many(reviews, Hypeapp.ReviewView, "review.json")}
  end

  def render("show.json", %{review: review}) do
    %{data: render_one(review, Hypeapp.ReviewView, "review.json")}
  end

  def render("review.json", %{review: review}) do
    %{id: review.id,
      place_id: review.place_id,
      user_id: review.user_id,
      review: review.review}
  end
end
