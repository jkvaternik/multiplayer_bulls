defmodule BullsAndCows.Game do
  def new do
    %{
      secret: random_secret(),
      gameReady: false,
      users: [],
      bulls: %{},
      guesses:  %{},
      gameOver: false,
      error?: false
    }
  end

  def ready(st, username) do
    # Where user has name "name", set player to ready and player to true
    # IO.puts("REady in channel:" + username)
  end

  def player(st, user) do
    IO.puts("helllooooooooo")
    IO.puts(inspect(user))
    IO.puts(inspect(st))

    e =
      st.users
      |> Enum.find(fn u -> u.name === user.username end)

    newUsers = Enum.filter(st.users, fn u -> u.name !== user.username end)
    %{st | users: newUsers ++ [%{name: e.name, player?: user.player, ready?: false}]}
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
    %{st | users: st.users ++ [%{name: username, player?: false, ready?: false}]}
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
    user = guess.name
    number = guess.guess
    if valid?(number) do
      user_bulls = Map.get(st.bulls, user, [])
      user_guesses = Map.get(st.guesses, user, [])
      bulls = bulls_and_cows(st, number)
      guesses = user_guesses ++ [number]

      %{
        st
        | guesses: Map.put(st.guesses, user, [guesses]),
          bulls: Map.put(st.bulls, user, [user_bulls ++ [bulls]]),
          error?: false,
          gameOver: bulls === "A4B0"
      }
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
    IO.puts(inspect(st))

    cond do
      st.gameOver ->
        cond do
          List.last(st.bulls) === "A4B0" ->
            %{
              gameReady: st.gameReady,
              users: st.users,
              bulls: st.bulls,
              guesses: st.guesses,
              gameOver: "Game over. You win! :)"
            }

          length(st.guesses) === 8 ->
            %{
              gameReady: st.gameReady,
              users: st.users,
              bulls: st.bulls,
              guesses: st.guesses,
              gameOver: "Game over. You lose :("
            }
        end

      st.error? ->
        %{
          gameReady: st.gameReady,
          users: st.users,
          bulls: st.bulls,
          guesses: st.guesses,
          message: "Guess is not four unique digits. Please try again."
        }

      true ->
        %{
          gameReady: st.gameReady,
          users: st.users,
          bulls: st.bulls,
          guesses: st.guesses,
          message: nil
        }
    end
  end
end
