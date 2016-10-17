defmodule Hypeapp.AuthController do
  use Hypeapp.Web, :controller
  import Hypeapp.QueryParameters

  @doc """
    Yelp requests does not need callback/redirect urls for authorization.
  """
  def index(conn, %{"provider" => "yelp"} = parameters) do
    # Just render from here? json whatever
    client = get_token!("yelp")
    qURL = getQUrl(parameters)

    places = get_places!("yelp", client, qURL)
      |> Enum.filter(&( &1["rating"] >=4 ))
    json conn, %{places: places}
  end

  defp get_token!("yelp"), do: Yelp.get_token!()
  defp get_token!(_), do: raise "No matching provider available"

  defp get_places!("yelp", client, qURL) do
    %{body: places} = OAuth2.Client.get!(client, "/v3/businesses/search?term=restaurants&sort_by=rating&" <> qURL)
    places["businesses"]
  end

end
