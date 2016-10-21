defmodule Hypeapp.Repo.Migrations.AddPlaceIdToReviewsAndVotes do
  use Ecto.Migration

  def change do
    alter table(:votes) do
      remove :yelp_id
      add :place_id, references(:places, on_delete: :delete_all)
    end

    alter table(:reviews) do
      add :place_id, references(:places, on_delete: :delete_all)
    end

    alter table(:places) do
      modify :yelp_id, :string, null: false
      modify :zip_code, :string, null: false
    end
  end
end
