defmodule Hypeapp.Repo.Migrations.DropPlacesTable do
  use Ecto.Migration

  #should have used: drop constraint(:reviews, name: "reviews_place_id_fkeye")
  def change do
    execute "ALTER TABLE reviews DROP CONSTRAINT reviews_place_id_fkey"
    drop table(:places)
  end
end
