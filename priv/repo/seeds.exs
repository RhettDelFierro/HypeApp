# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Hypeapp.Repo.insert!(%Hypeapp.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


#DUMMMMMMY DATA. If you want more we can add more to the list.:
alias Hypeapp.{Repo, User}

# Note the pipe operators. This entry will get piped as the first argument
# into Enum.map/2. The shorthand notation means some the element (a changeset)
# is the iteration over in the map wil be the 2nd argument to the changeset.
# once that Enum.map is done, the whoel thing will go to Enum.each
# where again one element (individual changeset) at a
# time goes into repo.insert. See below:
[
  %{
    first_name: "Some",
    last_name: "User",
    email: "someuser@hypeapp.com",
    password: "someuserpassword"
  },
  %{
    first_name: "Some",
    last_name: "User2",
    email: "someuser2@hypeapp.com",
    password: "someuserpassword2"
  },
]
# Shorthand for: Enum.map(structs, fn struct -> User.changeset(%User{}, struct) end
|> Enum.map(&User.changeset(%User{}, &1))
# Shorthand for: Enum.each(structs, fn struct -> Repo.insert(%User{}, struct) end
|> Enum.each(&Repo.insert!(&1))
