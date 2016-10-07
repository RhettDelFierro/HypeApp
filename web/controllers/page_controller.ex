defmodule Hypeapp.PageController do
  use Hypeapp.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
