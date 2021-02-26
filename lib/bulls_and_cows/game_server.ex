defmodule BullsAndCows.GameServer do
  use GenServer

  alias BullsAndCows.BackupAgent
  alias BullsAndCows.Game

  def reg(name) do
    {:via, Registry, {BullsAndCows.GameReg, name}}
  end

  def start(name) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [name]},
      restart: :permanent,
      type: :worker
    }
    BullsAndCows.GameSup.start_child(spec)
  end

  def start_link(name) do
    game = BackupAgent.get(name) || Game.new
    GenServer.start_link(
      __MODULE__,
      game,
      name: reg(name)
    )
  end

  def reset(name) do
    GenServer.call(reg(name), {:reset, name})
  end

  def guess(name, username, number) do
    GenServer.call(reg(name), {:guess, name,  %{username: username, number: number}})
  end

  def peek(name) do
    GenServer.call(reg(name), {:peek, name})
  end

  def login(name, username) do
    GenServer.call(reg(name), {:login, name, username})
  end

  def player(name, username, player) do
    GenServer.call(reg(name), {:player, name, %{username: username, player: player}})
  end

  def ready(name, user) do
    GenServer.call(reg(name), {:ready, name, user})
  end

  def leave(name, username) do
    GenServer.call(reg(name), {:leave, name, username})
  end


  # implementation

  def init(game) do
    # Process.send_after(self(), :pook, 15_000)
    {:ok, game}
  end

  def handle_call({:reset, name}, _from, game) do
    game = Game.new
    BackupAgent.put(name, game)
    {:reply, game, game}
  end

  def handle_call({:guess, name, guess}, _from, game) do
    game = Game.guess(game, guess)
    BackupAgent.put(name, game)
    {:reply, game, game}
  end

  def handle_call({:peek, _name}, _from, game) do
    {:reply, game, game}
  end

  def handle_call({:login, name, username}, _from, game) do
    game = Game.login(game, username)
    BackupAgent.put(name, game)
    {:reply, game, game}
  end

  def handle_call({:player, name, user}, _from, game) do
    game = Game.player(game, user)
    BackupAgent.put(name, game)
    {:reply, game, game}
  end

  def handle_call({:ready, name, username}, _from, game) do
    game = Game.ready(game, username)
    BackupAgent.put(name, game)
    {:reply, game, game}
  end

  def handle_call({:leave, name, username}, _from, game) do
    game = Game.leave(game, username)
    BackupAgent.put(name, game)
    {:reply, game, game}
  end
  
  # def handle_info(:pook, game) do
  #   game = Game.guess(game, %{username: "Jaime", number: "1234"})
  #   BullsAndCowsWeb.Endpoint.broadcast!(
  #     "game:1",
  #     "view",
  #     Game.view(game, ""))
  #   {:noreply, game}

  #   Process.send_after(self(), :pook, 15_000)
  # end

end
