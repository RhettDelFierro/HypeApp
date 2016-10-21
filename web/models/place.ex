defmodule Hypeapp.Place do
  use Hypeapp.Web, :model

  schema "places" do
    field :yelp_id, :string
    field :zip_code, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:yelp_id, :zip_code])
    |> validate_required([:yelp_id, :zip_code])
  end
end
