defmodule Hypeapp.ParseUrlencode do
  def encode!(data), do: URI.encode_www_form(data)
  def decode!(binary), do: URI.decode_www_form(binary)
end
