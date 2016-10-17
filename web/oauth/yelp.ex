defmodule Yelp do
  @moduledoc """
 An OAuth2 strategy for Yelp.
 """
 use OAuth2.Strategy

 alias OAuth2.Strategy.ClientCredentials

 @doc """
  More Oauth config will be merged with environment variables
  when new client is made.
 """
 defp config do
   [strategy: ClientCredentials,
     site: "https://api.yelp.com",
     token_url: "https://api.yelp.com/oauth2/token"]
 end

 @doc """
  Will get me a new client with the necessary params merged with env variables.
 """
 def client do
    Application.get_env(:hypeapp, Yelp)
      |> Keyword.merge(config())
      |> OAuth2.Client.new()
      |> IO.inspect
  end

  @doc """
    Return a new transformed client (that's being passed in) with the token.
  """
  def get_token() do
    #IO.inspect Application.get_env(:hypeapp, Yelp)
    client()
      |> put_header("content-type", "application/x-www-form-urlencoded")
      |> put_header("Accept", "application/json")
      |> ClientCredentials.get_token([auth_scheme: "request_body"], [])
  end

end
