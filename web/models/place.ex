defmodule Hypeapp.Place do
  use Hypeapp.Web, :model

  schema "places" do
    field :yelp_id, :string
    field :name, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:yelp_id, :name])
    |> validate_required([:yelp_id, :name])
    |> unique_constraint(:yelp_id)
  end
end
