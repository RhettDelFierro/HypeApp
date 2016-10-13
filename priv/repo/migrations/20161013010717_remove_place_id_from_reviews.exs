defmodule Hypeapp.Repo.Migrations.RemovePlaceIdFromReviews do
  use Ecto.Migration

  def change do
    alter table(:reviews) do
      remove :place_id 
    end
  end
end
