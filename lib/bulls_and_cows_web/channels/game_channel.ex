defmodule BullsAndCowsWeb.GameChannel do
  use BullsAndCowsWeb, :channel

  alias BullsAndCows.Game
  alias BullsAndCows.GameServer

  @impl true
  def join("game:" <> name, payload, socket) do
    if authorized?(payload) do
      GameServer.start(name)
      socket = socket
      |> assign(:name, name)
      |> assign(:user, "")
      game = GameServer.peek(name)
      view = Game.view(game, "")
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("login", user, socket) do
    socket = assign(socket, :user, user)
    view = socket.assigns[:name]
    |> GameServer.login(user)
    |> Game.view(user)
    IO.puts(inspect(view))
    {:reply, {:ok, view}, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("guess", %{"number" => num}, socket) do
    user = socket.assigns[:user]
    view = socket.assigns[:name]
    |> GameServer.guess(num)
    |> Game.view(user)
    broadcast(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _, socket) do
    user = socket.assigns[:user]
    view = socket.assigns[:name]
    |> GameServer.reset()
    |> Game.view(user)
    broadcast(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("ready", username, socket) do
    user = socket.assigns[:user]
    view = socket.assigns[:name]
    |> GameServer.ready(username)
    |> Game.view(user)
    {:reply, {:ok, view}, socket}
  end


  def handle_in("player", %{"username" => username, "player" => player}, socket) do
    user = socket.assigns[:user]
    IO.puts(inspect("socket"))
    IO.puts(inspect(GameServer.peek(socket.assigns[:name])))
    view = socket.assigns[:name]
    |> GameServer.player(username, player)
    |> Game.view(user)
    {:reply, {:ok, view}, socket}
  end

  intercept ["view"]

  @impl true
  def handle_out("view", msg, socket) do
    user = socket.assigns[:user]
    msg = %{msg | user: user}
    push(socket, "view", msg)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
