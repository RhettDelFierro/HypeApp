defmodule Hypeapp.VoteTest do
  use Hypeapp.ModelCase

  alias Hypeapp.Vote

  @valid_attrs %{yelp_id: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Vote.changeset(%Vote{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Vote.changeset(%Vote{}, @invalid_attrs)
    refute changeset.valid?
  end
end
