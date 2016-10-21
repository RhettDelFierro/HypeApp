defmodule Hypeapp.PlaceTest do
  use Hypeapp.ModelCase

  alias Hypeapp.Place

  @valid_attrs %{yelp_id: "some content", zip_code: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Place.changeset(%Place{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Place.changeset(%Place{}, @invalid_attrs)
    refute changeset.valid?
  end
end
