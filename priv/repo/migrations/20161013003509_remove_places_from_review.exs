defmodule Hypeapp.Repo.Migrations.RemovePlacesFromReview do
  use Ecto.Migration

  def change do
    drop index(:reviews, [:place_id])
  end
end
