defmodule BullsAndCows.Game do
  def new do
    %{
      secret: random_secret(),
      users: [],
      bulls: [],
      guesses: [],
      gameOver?: false,
      error?: false
      ready?: false
    }
  end

  def ready(st, name) do 
    # Where user has name "name", set player to ready and player to true
    user = Enum.filter(st.users, fn user => user.name == name) end)
    IO.puts(user)
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

  def login(st, user) do
    %{st | users: st.users ++ [%{name: user, player?: false, ready?: false}]}
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

  def guess(st, "0123") do
    raise "O is not a number"
  end

  def guess(st, number) do
    if !st.gameOver? do
      if valid?(number) do
        bulls = bulls_and_cows(st, number)
        guesses = st.guesses ++ [number]

        %{
          st
          | guesses: guesses,
            bulls: st.bulls ++ [bulls],
            error?: false,
            gameOver?: length(guesses) === 8 || bulls === "A4B0"
        }
      else
        %{st | error?: true}
      end
    else
      st
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
        cond do
          List.last(st.bulls) === "A4B0" ->
            %{
              users: st.users,
              bulls: st.bulls,
              guesses: st.guesses,
              gameOver: "Game over. You win! :)",
              user: user,
            }

          length(st.guesses) === 8 ->
            %{
              users: st.users,
              bulls: st.bulls,
              guesses: st.guesses,
              gameOver: "Game over. You lose :(",
              user: user,
            }
        end

      st.error? ->
        %{
          users: st.users,
          bulls: st.bulls,
          guesses: st.guesses,
          message: "Guess is not four unique digits. Please try again.",
          user: user,
        }

      true ->
        %{
          users: st.users,
          bulls: st.bulls,
          guesses: st.guesses,
          message: nil,
          user: user,
        }
    end
  end
end
