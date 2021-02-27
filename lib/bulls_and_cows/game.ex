defmodule BullsAndCows.Game do
  def new do
    %{
      secret: random_secret(),
      gameReady: false,
      gamename: "",
      users: [],
      gameOver: false,
      error: false,
      winners: []
    }
  end

  def ready(st, username) do
    e =
      st.users
      |> Enum.find(fn u -> u.username === username end)

    newUsers = Enum.filter(st.users, fn u -> u.username !== username end)

    %{
      st
      | users:
          newUsers ++
            [
              %{
                username: e.username,
                player: e.player,
                ready: !e.ready,
                bulls: e.bulls,
                guesses: e.guesses,
                turn_guess: e.turn_guess,
                wins: e.wins,
                losses: e.losses
              }
            ]
    }
  end

  def player(st, user) do
    e =
      st.users
      |> Enum.find(fn u -> u.username === user.username end)

    newUsers = Enum.filter(st.users, fn u -> u.username !== user.username end)

    %{
      st
      | users:
          newUsers ++
            [
              %{
                username: e.username,
                player: user.player,
                ready: false,
                bulls: e.bulls,
                guesses: e.guesses,
                turn_guess: e.turn_guess,
                wins: e.wins,
                losses: e.losses
              }
            ]
    }
  end

  def random_secret() do
    nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    create_uniq_secret("", nums, 4)
  end

  def create_uniq_secret(secret, list, length) do
    if length === 0 do
      secret
    else
      random_num = Enum.random(list)

      create_uniq_secret(
        secret <> Integer.to_string(random_num),
        List.delete(list, random_num),
        length - 1
      )
    end
  end

  def login(st, gamename, username) do
    if !Enum.any?(st.users, fn u -> u.username == username end) do
      %{
        st
        | users:
            st.users ++
              [
                %{
                  username: username,
                  player: false,
                  ready: false,
                  bulls: [],
                  guesses: [],
                  turn_guess: "",
                  wins: 0,
                  losses: 0
                }
              ],
          gamename: gamename
      }
    else
      %{
        st
        | gamename: gamename
      }
    end
  end

  def leave(st, username) do
    e =
      st.users
      |> Enum.find(fn u -> u.username === username end)

    newUsers = Enum.filter(st.users, fn u -> u.username !== username end)

    %{
      st
      | users:
          newUsers ++
            [
              %{
                username: e.username,
                player: false,
                ready: false,
                bulls: [],
                guesses: [],
                turn_guess: "",
                wins: e.wins,
                losses: e.losses
              }
            ]
    }
  end

  def valid?(number) do
    ## Pulled/modified from Olivia's hw05 code
    digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    number
    |> String.split("", trim: true)
    |> Enum.filter(fn dd -> Enum.member?(digits, dd) end)
    |> MapSet.new()
    |> MapSet.size() === 4
  end

  def guess(st, guess) do
    user = guess.username
    number = guess.number

    users =
      st.users
      |> Enum.map(fn u ->
        if u.username === user do
          %{u | turn_guess: number}
        else
          u
        end
      end)

    %{st | users: users}
  end

  @spec show_guesses(%{:users => any, optional(any) => any}) :: %{
          :users => list,
          optional(any) => any
        }
  def show_guesses(st) do
    users =
      st.users
      |> Enum.map(fn user ->
        if user.turn_guess === "" do
          %{
            user
            | guesses: user.guesses ++ ["PASS"],
              bulls: user.bulls ++ ["PASS"],
              turn_guess: ""
          }
        else
          if valid?(user.turn_guess) do
            turn_bulls = bulls_and_cows(st, user.turn_guess)
            %{
              user
              | guesses: user.guesses ++ [user.turn_guess],
                bulls: user.bulls ++ [turn_bulls],
                turn_guess: ""
            }
          else
            raise "You're stoopid."
          end
        end
      end)
    
    winners = Enum.filter(users, fn user -> Enum.member?(user.bulls, "A4B0") end)
    if Enum.count(winners) > 0 do 
      ws = (winners 
      |> Enum.map(fn user -> user.username end))
      %{st | gameOver: true, users: users, winners: ws}
    else 
      %{st | users: users }
    end

    
  end

  def bulls_and_cows(st, number) do
    secret =
      st.secret
      |> String.split("", trim: true)

    guess =
      number
      |> String.split("", trim: true)

    li = Enum.zip(secret, guess)

    bulls_cows =
      List.foldl(li, {0, 0}, fn x, acc ->
        cond do
          elem(x, 0) === elem(x, 1) ->
            {elem(acc, 0) + 1, elem(acc, 1)}

          Enum.member?(secret, elem(x, 1)) ->
            {elem(acc, 0), elem(acc, 1) + 1}

          true ->
            acc
        end
      end)

    "A#{elem(bulls_cows, 0)}B#{elem(bulls_cows, 1)}"
  end

  def game_ready?(st) do
    ready = true

    min =
      st.users
      |> Enum.filter(fn uu ->
        if uu.player do
          ready = uu.ready
        end
      end)
      |> Enum.count() >= 4

    if ready && min do
      %{
        st
        | gameReady: true,
          winners: []
      }
    else
      %{st | gameReady: false}
    end
  end

  def view(st) do
    cond do
      st.gameOver ->
        newUsers =
          Enum.map(st.users, fn uu ->
            if uu.player do
              if !Enum.member?(st.winners, uu.username) do
                uu = %{
                  username: uu.username,
                  player: false,
                  ready: false,
                  bulls: [],
                  guesses: [],
                  turn_guess: "",
                  wins: uu.wins,
                  losses: uu.losses + 1
                }
              else
                uu = %{
                  username: uu.username,
                  player: false,
                  ready: false,
                  bulls: [],
                  guesses: [],
                  turn_guess: "",
                  wins: uu.wins + 1,
                  losses: uu.losses
                }
              end
            else
              uu = %{
                username: uu.username,
                player: false,
                ready: false,
                bulls: [],
                guesses: [],
                turn_guess: "",
                wins: uu.wins,
                losses: uu.losses
              }
            end
          end)

        %{
          secret: random_secret(),
          gameReady: false,
          users: newUsers,
          gameOver: false,
          winners: st.winners
        }

      true ->
        st
    end
  end
end
