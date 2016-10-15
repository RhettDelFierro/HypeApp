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

  scope "/api", Hypeapp do
    pipe_through :api

    scope "/v1" do
      #accepts JSON

      # get request to /api/v1/current_user
      get "/current_user", CurrentUserController, :show
      #/api/v1/registrations route with a POST request will go to
      #the :create action in RegistrationController.
      post "/registrations", RegistrationController, :create
      #POST requests to api/v1/sessions and /api/v1/sessions/:id respectively.
      # resources "/sessions", SessionController, only: [:create, :delete]
      post "/sessions", SessionController, :create
      delete "/sessions", SessionController, :delete
      #Here on out:
      resources "/reviews", ReviewController, except: [:new, :edit]
      resources "/votes", VoteController, except: [:new, :edit]
    end
  end

  scope "/", Hypeapp do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end
end
