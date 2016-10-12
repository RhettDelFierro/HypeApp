defmodule Hypeapp.Repo.Migrations.CreateReview do
  use Ecto.Migration

  def change do
    create table(:reviews) do
      add :review, :string
      add :place_id, references(:places, on_delete: :delete_all)
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end
    create index(:reviews, [:place_id])
    create index(:reviews, [:user_id])

  end
end
