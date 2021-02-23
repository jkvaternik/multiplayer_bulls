defmodule BullsAndCowsWeb.PageController do
  use BullsAndCowsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
