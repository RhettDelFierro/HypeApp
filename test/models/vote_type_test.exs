defmodule Hypeapp.VoteTypeTest do
  use Hypeapp.ModelCase

  alias Hypeapp.VoteType

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = VoteType.changeset(%VoteType{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = VoteType.changeset(%VoteType{}, @invalid_attrs)
    refute changeset.valid?
  end
end
