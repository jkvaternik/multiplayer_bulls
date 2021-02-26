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
      view = Game.view(game)
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("login", user, socket) do
    ## FIXME : Not join as duplicate
    socket = assign(socket, :user, user)
    view = socket.assigns[:name]
    |> GameServer.login(user)
    |> Game.view()
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("guess", num, socket) do
    user = socket.assigns[:user]
    view = socket.assigns[:name]
    |> GameServer.guess(user, num)
    |> Game.view()
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _, socket) do
    user = socket.assigns[:user]
    view = socket.assigns[:name]
    |> GameServer.reset()
    |> Game.view()
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("leave", _, socket) do
    user = socket.assigns[:user]
    view = socket.assigns[:name]
    |> GameServer.leave(user)
    |> Game.view()
    broadcast(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("ready", _, socket) do
    user = socket.assigns[:user]
    game = socket.assigns[:name]
    |> GameServer.ready(user)

    if game.gameReady? do
      GameServer.start_game(game.gamename)
    end
    view = Game.view(game)
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end


  def handle_in("player", player, socket) do
    user = socket.assigns[:user]
    view = socket.assigns[:name]
    |> GameServer.player(user, player)
    |> Game.view()
    broadcast(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  intercept ["view"]

  @impl true
  def handle_out("view", msg, socket) do
    view = Game.view(msg)
    push(socket, "view", view)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
