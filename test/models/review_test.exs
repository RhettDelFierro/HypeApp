defmodule Hypeapp.ReviewTest do
  use Hypeapp.ModelCase

  alias Hypeapp.Review

  @valid_attrs %{review: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Review.changeset(%Review{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Review.changeset(%Review{}, @invalid_attrs)
    refute changeset.valid?
  end
end
