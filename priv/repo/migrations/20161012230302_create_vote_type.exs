defmodule Hypeapp.Repo.Migrations.CreateVoteType do
  use Ecto.Migration

  def change do
    create table(:vote_types) do
      add :vote_type, :string, null: false

      timestamps()
    end
    create unique_index(:vote_types, [:vote_type])
  end
end
