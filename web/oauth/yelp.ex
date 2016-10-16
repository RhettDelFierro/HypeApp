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
   [strategy: Yelp,
     site: "https://api.yelp.com",
     token_url: "https://api.yelp.com/oauth2/token"]
 end

 @doc """
  Will get me a new client with the necessary params merged with env variables.
 """
 def client do
    Application.get_env(:hypeapp, Yelp)
      |> Keyword.merge(config())
      |> Oauth2.Client.new()
  end

  @doc """
    Return a new transformed client (that's being passed in) with the token.
  """
  def get_token(client,params) do
    ClientCredentials.get_token(client(),%{:auth_scheme, "request_body"})
    # client
    #   |> put_param(:client_secret, client.client_secret)
    #   |> put_param(:client_id, client.client_id)
    #   |> put_param(:grant_type, "client_credentials")
    #   |> ClientCredentials.get_token(params,headers)
  end

  #Now do the searching in the controller. Render in the view.

end
