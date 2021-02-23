import { ch_join, ch_push, ch_reset } from './socket';

import React, { useEffect, useState } from 'react';

import Guesses from './components/Guesses';
import Message from './components/Message';
import Controls from './components/Controls';

const Bulls = (props) => {
  useEffect(() => {
    ch_join(setState)
  });

  function makeGuess(guess) {
    ch_push(guess)
  }

  function newGameHandler() {
    ch_reset()
    setError({
      hasError: false,
      errorMessage: 'Guess is not four unique digits.'
    })
  }

  return (
    <section className="game">
      {state.message || state.gameOver ?
        (state.gameOver ?
          <Message message={state.gameOver} /> :
          <Message message={state.message} />) :
        null}
      <h2 style={{ margin: "2.0rem 0" }}>4digits</h2>
      <button onClick={newGameHandler}>New Game</button>
      <div style={{ float: 'clear' }}>
        <p>
          Welcome to 4digits! A random sequence of 4 unique digits is generated for you to guess. If the matching digits are in their right positions, they are "bulls" (As), if in different positions, they are "cows" (Bs). You have 8 attempts to guess the number. Good luck!
        </p>
        { state.player ? <Controls
          guessed={makeGuess} /> : null}
        <Guesses guesses={{ guesses: state.guesses, bulls: state.bulls }} />
      </div>
    </section>
  );
}

export default Bulls;