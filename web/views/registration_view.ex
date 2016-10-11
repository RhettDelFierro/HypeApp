defmodule Hypeapp.RegistrationView do
  use Hypeapp.Web, :view

  def render("error.json", %{changeset: changeset}) do
    # setting the error map to be sent back:
    errors = Enum.map(changeset.errors, fn {field, detail} ->
      %{} |> Map.put(field, render_detail(detail))
    end)

    # The above error map sending back as 'errors' when rendered:
    %{errors: errors}
  end

  #helper function to return a map of key/value pairs.
  defp render_detail({message, values}) do
    Enum.reduce(values, message, fn {k, v}, acc -> String.replace(acc, "%{#{k}}", to_string(v)) end)
  end

  defp render_detail(message) do
    message
  end
end
