defmodule Hypeapp.VotesControllerTest do
  use Hypeapp.ConnCase

  alias Hypeapp.Votes
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, votes_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    votes = Repo.insert! %Votes{}
    conn = get conn, votes_path(conn, :show, votes)
    assert json_response(conn, 200)["data"] == %{"id" => votes.id,
      "vote_type_id" => votes.vote_type_id}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, votes_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, votes_path(conn, :create), votes: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Votes, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, votes_path(conn, :create), votes: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    votes = Repo.insert! %Votes{}
    conn = put conn, votes_path(conn, :update, votes), votes: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Votes, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    votes = Repo.insert! %Votes{}
    conn = put conn, votes_path(conn, :update, votes), votes: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    votes = Repo.insert! %Votes{}
    conn = delete conn, votes_path(conn, :delete, votes)
    assert response(conn, 204)
    refute Repo.get(Votes, votes.id)
  end
end
