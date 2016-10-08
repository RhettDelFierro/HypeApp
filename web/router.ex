defmodule Hypeapp.Router do
  use Hypeapp.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    # looks for Authorization Header
    plug Guardian.Plug.VerifyHeader
    # makes current resource available to Guardian.Plug.current_resource(conn)
    # IF the token is present.
    plug Guardian.Plug.LoadResource
  end

  scope "/", Hypeapp do
    pipe_through :browser # Use the default browser stack

    get "*path", PageController, :index
  end

  scope "/api", Hypeapp do
    pipe_through :api

    scope "/v1" do
      #/api/v1/registrations route wiht a POST request will go to
      #the :create action in RegistrationController. To be made.
      #accepts JSON.
      post "/registrations", RegistrationController, :create
      resources "/sessions", SessionController, only: [:create, :delete]
    end
  end
end
