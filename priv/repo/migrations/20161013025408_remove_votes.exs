defmodule Hypeapp.Repo.Migrations.RemoveVotes do
  use Ecto.Migration

  def change do
    drop table(:votes)
  end
end
