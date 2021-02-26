defmodule BullsAndCows.Game do
  def new do
    %{
      secret: random_secret(),
      gameReady: false,
      users: [],
      bulls: %{},
      guesses:  %{},
      gameOver?: false,
      error?: false,
      winners: [],
    }
  end

  def ready(st, username) do
    e =
      st.users
      |> Enum.find(fn u -> u.username === username end)

    newUsers = Enum.filter(st.users, fn u -> u.username !== username end)
    %{st | users: newUsers ++ [%{username: e.username, player?: e.player?, ready?: !e.ready?, wins: e.wins, losses: e.losses}]}
  end

  def player(st, user) do
    e =
      st.users
      |> Enum.find(fn u -> u.username === user.username end)

    newUsers = Enum.filter(st.users, fn u -> u.username !== user.username end)
    %{st | users: newUsers ++ [%{username: e.username, player?: user.player, ready?: false, wins: e.wins, losses: e.losses}]}
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

  def login(st, username) do
    if !Enum.any?(st.users, fn u -> u.username == username end) do 
      %{st | users: st.users ++ [%{username: username, player?: false, ready?: false, wins: 0, losses: 0}]}
    else
      st
    end
  end

  def leave(st, username) do 
    e =
      st.users
      |> Enum.find(fn u -> u.username === username end)

    newUsers = Enum.filter(st.users, fn u -> u.username !== username end)
    %{st | 
      guesses: Map.replace(st.guesses, username, []),
      bulls: Map.replace(st.bulls, username, []),
      users: newUsers ++ [%{username: e.username, player?: false, ready?: false, wins: e.wins, losses: e.losses}]}
  end

  def valid?(number) do
    ## Pulled/modified from Olivia's hw05 code
    digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    ## check if empty or pass
    if number === "" do
      true
    else
      number
      |> String.split("", trim: true)
      |> Enum.filter(fn dd -> Enum.member?(digits, dd) end)
      |> MapSet.new()
      |> MapSet.size() === 4
    end
  end

  def guess(st, guess) do
    user = guess.username
    number = guess.number

    if valid?(number) do
      user_bulls = Map.get(st.bulls, user, [])
      user_guesses = Map.get(st.guesses, user, [])
      bulls = bulls_and_cows(st, number)
      guesses = user_guesses ++ [number]
      if (bulls === "A4B0") do 
        %{
          st
          | guesses: Map.put(st.guesses, user, guesses),
            bulls: Map.put(st.bulls, user, user_bulls ++ [bulls]),
            error?: false,
            gameOver?: true, 
            winners: st.winners ++ [user]
        }
      else 
        %{
          st
          | guesses: Map.put(st.guesses, user, guesses),
            bulls: Map.put(st.bulls, user, user_bulls ++ [bulls]),
            error?: false,
        }
      end
      
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

  def view(st, user) do
    cond do
      st.gameOver? ->
        newUsers = Enum.map(st.users, fn uu -> 
          if (uu.player?) do
            !if Enum.member?(st.winners, uu.username) do 
              uu = %{username: uu.username, player?: false, ready?: false, wins: uu.wins, losses: uu.losses + 1}
            else 
              uu = %{username: uu.username, player?: false, ready?: false, wins: uu.wins + 1, losses: uu.losses}
            end
          else 
            uu = %{username: uu.username, player?: false, ready?: false, wins: uu.wins, losses: uu.losses}
          end
        end)
    
        %{
          secret: random_secret(),
          gameReady: false,
          users: newUsers,
          bulls: %{},
          guesses:  %{},
          gameOver?: false,
          winners: st.winners
        }

      !st.gameReady ->
        ready = true
        min = (st.users
        |> Enum.filter(fn uu -> (
          if uu.player? do 
            ready = uu.ready? 
          end)
        end)
        |> Enum.count()) >= 4

        if ready && min do 
          %{
            st | 
            gameReady: true,
            winners: []
          }
        else  
          %{ st | gameReady: false }
        end

      true -> st
    end
  end
end
