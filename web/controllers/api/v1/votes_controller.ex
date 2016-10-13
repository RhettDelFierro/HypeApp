defmodule Hypeapp.VotesController do
  use Hypeapp.Web, :controller

  alias Hypeapp.Votes

  def index(conn, _params) do
    votes = Repo.all(Votes)
    render(conn, "index.json", votes: votes)
  end

  def create(conn, %{"votes" => votes_params}) do
    changeset = Votes.changeset(%Votes{}, votes_params)

    case Repo.insert(changeset) do
      {:ok, votes} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", votes_path(conn, :show, votes))
        |> render("show.json", votes: votes)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Hypeapp.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    votes = Repo.get!(Votes, id)
    render(conn, "show.json", votes: votes)
  end

  def update(conn, %{"id" => id, "votes" => votes_params}) do
    votes = Repo.get!(Votes, id)
    changeset = Votes.changeset(votes, votes_params)

    case Repo.update(changeset) do
      {:ok, votes} ->
        render(conn, "show.json", votes: votes)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Hypeapp.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    votes = Repo.get!(Votes, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(votes)

    send_resp(conn, :no_content, "")
  end
end
