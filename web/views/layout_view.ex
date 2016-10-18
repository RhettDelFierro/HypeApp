defmodule Hypeapp.LayoutView do
  use Hypeapp.Web, :view

  def google_script do
    api_key = Application.get_env(:hypeapp, Hypeapp.LayoutView)[:api_key]
    "http://maps.googleapis.com/maps/api/js?key=#{api_key}"
  end
end
