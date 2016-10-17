defmodule Hypeapp.AuthController do
  use Hypeapp.Web, :controller
  import Hypeapp.QueryParameters

  @doc """
    Yelp requests does not need callback/redirect urls for authorization.
  """
  def index(conn, %{"provider" => "yelp"} = parameters) do
    # Just render from here? json whatever
    client = get_token!("yelp")
    IO.inspect client
    qURL = getQUrl(parameters)

    places = get_places!("yelp", client, qURL)
    # IO.inspect places
    json conn, %{places: places}
  end

  # @doc """
  #   Requests to providers that need callback/redirect urls for authorization.
  # """
  # def index(conn, %{"provider" => provider} = parameters) do
  #   # Just render from here. pattern match the provider to get next action.
  #
  # end
  #
  # def delete(conn, _params) do
  #
  # end
  #
  # @doc """
  #
  # """
  # def callback(conn, %{"provider" => provider, "code" => code}) do
  #
  # end
  defp get_token!("yelp"), do: Yelp.get_token!()
  defp get_token!(_), do: raise "No matching provider available"

  defp get_places!("yelp", client, qURL) do
    %{body: places} = OAuth2.Client.get!(client, "/v3/businesses/search?term=restaurants&" <> qURL)
    %{businesses: places}
  end

end
