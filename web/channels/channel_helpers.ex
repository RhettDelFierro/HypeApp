defmodule Hypeapp.ChannelHelpers do
  @moduledoc """
  Channel helper functions to prevent DRY.
  """

  @doc """
  helper function for authorization:

  """
  def authorize(payload, fun, custom_authorize \\ nil) do
    check_authorization = custom_authorize || &authorized?/1
    if check_authorization.(payload) do
      fun.()
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @doc """
  Function that determines authorization logic. If `true`, all users will be authorized.
  """
  def authorized?(_payload) do
    true
  end
end
