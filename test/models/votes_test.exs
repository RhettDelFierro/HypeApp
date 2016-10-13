defmodule Hypeapp.VotesTest do
  use Hypeapp.ModelCase

  alias Hypeapp.Votes

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Votes.changeset(%Votes{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Votes.changeset(%Votes{}, @invalid_attrs)
    refute changeset.valid?
  end
end
