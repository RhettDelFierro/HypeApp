defmodule Hypeapp.CurrentUserView do
  use Hypeapp.Web, :view

  def render("show.json", %{user: user}) do
    %{user: user}
  end

  def render("error.json", _) do
  end
end
