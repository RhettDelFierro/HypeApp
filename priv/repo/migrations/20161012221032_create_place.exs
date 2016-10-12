defmodule Hypeapp.Repo.Migrations.CreatePlace do
  use Ecto.Migration

  def change do
    create table(:places) do
      add :yelp_id, :string, null: false
      add :name, :string, null: false

      timestamps()
    end
      create unique_index(:places, [:yelp_id])
  end
end
