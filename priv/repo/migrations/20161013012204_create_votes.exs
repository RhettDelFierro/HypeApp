defmodule Hypeapp.Repo.Migrations.CreateVotes do
  use Ecto.Migration

  def change do
    create table(:votes) do
      add :vote_type_id, references(:vote_types, on_delete: :nothing)

      timestamps()
    end
    create index(:votes, [:vote_type_id])

  end
end
