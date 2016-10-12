defmodule Hypeapp.PlaceView do
  use Hypeapp.Web, :view

  def render("index.json", %{places: places}) do
    %{data: render_many(places, Hypeapp.PlaceView, "place.json")}
  end

  def render("show.json", %{place: place}) do
    %{data: render_one(place, Hypeapp.PlaceView, "place.json")}
  end

  def render("place.json", %{place: place}) do
    %{id: place.id,
      yelp_id: place.yelp_id,
      name: place.name}
  end
end
