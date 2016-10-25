defmodule Hypeapp.Repo.Migrations.AddReviewToVote do
  use Ecto.Migration

  def change do
    alter table(:votes) do
      add :review, :text 
    end
  end
end
