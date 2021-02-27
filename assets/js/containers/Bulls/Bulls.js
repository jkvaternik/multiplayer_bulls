import { ch_join, ch_push, ch_reset } from '../../socket';

import React, { useEffect, useState } from 'react';

import Guesses from '../../components/Guesses';
import Message from '../../components/Message';
import Controls from '../../components/Controls';

const Bulls = (props) => {

  const [error, setError] = useState("");

  return (
    <section className="game">
      {error ?
        <Message message={error} /> :
        null}
      <h2 style={{ margin: "2.0rem 0" }}>4digits</h2>
      <h4>Welcome {props.user.name}!</h4>
      <button onClick={props.leave}>Leave Game</button>
      <div style={{ float: 'clear' }}>
        <p>
          Welcome to 4digits! A random sequence of 4 unique digits is generated for you to guess. If the matching digits are in their right positions, they are "bulls" (As), if in different positions, they are "cows" (Bs). You have 30 seconds to make a guess or pass for each turn. If you don't pick to guess or pass, the game will automatically pass for you after the 30 seconds. Good luck!
        </p>
        {props.user.player ? <Controls
          guessed={props.guessed} error={setError} /> : null}
        <Guesses users={props.game.users} />
      </div>
    </section>
  );
}

export default Bulls;