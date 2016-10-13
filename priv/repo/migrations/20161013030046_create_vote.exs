defmodule Hypeapp.Repo.Migrations.CreateVote do
  use Ecto.Migration

  def change do
    create table(:votes) do
      add :yelp_id, :string
      add :vote_type_id, references(:vote_types, on_delete: :nothing)

      timestamps()
    end
    create index(:votes, [:vote_type_id])

  end
end
