defmodule Hypeapp.QueryParameters do
  @moduledoc """
    converts maps of query parameters to strings and other types.
  """
  def getQUrl(params) do
    url = Enum.reduce(params, "", fn {key, val}, str ->
      str <> key <> "=" <> val <> "&"
    end)
    # Really refactor this: Try pattern matching to get rid of the last character (the &)
    base = String.length(url)
    String.slice(url, 0..base-2)
  end
end
