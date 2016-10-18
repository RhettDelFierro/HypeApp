defmodule Hypeapp.AuthController do
  use Hypeapp.Web, :controller
  import Hypeapp.QueryParameters

  @doc """
    Yelp requests does not need callback/redirect urls for authorization.
    #refactor: mainly in  the Yelp module. The config and slient structs look ugly. May not need all the functions I'm uing in that module. Can just call them in here and pass the arguments into those functions rather than calling each invoking each function in the arguments. See Keyword.merge()
  """
  def index(conn, %{"provider" => "yelp"} = parameters) do
    # Just render from here? json whatever
    client = get_token!("yelp")
    #generate our query string to yelp with the parmeters passed in to this controller.
    qURL = getQUrl(parameters)

    places = get_places!("yelp", client, qURL)
      |> Enum.filter(&(&1["rating"] >=4))
      |> Enum.sort(&(&1["review_count"] > &2["review_count"]))

    #maybe create a view to render the json instead? can also do the Enum in that module.
    json conn, %{places: places}
  end

  defp get_token!("yelp"), do: Yelp.get_token!()
  defp get_token!(_), do: raise "No matching provider available"

  # handle tuples?
  defp get_places!("yelp", client, qURL) do
    %{body: places} = OAuth2.Client.get!(client, "/v3/businesses/search?term=restaurants,food&radius=14000&sort_by=rating&" <> qURL)
    places["businesses"]
  end

end
