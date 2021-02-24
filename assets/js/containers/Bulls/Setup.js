import React, { useState } from 'react';
import { ch_ready } from '../../socket';

const Setup = (appState) => {

  const [state, setState] = useState(appState);
  const [buttonState, setButtonState] = useState("observer");
  let toggle = null;

  function handleButtonChange(ev) {
    if (!state.gameReady) {
      setButtonState(ev.target.value);
    }
  }

  function setGameReady() {
    ch_ready(state.name);
  }

  if (buttonState === "player") {
    toggle = (<button className="btn btn-primary" onClick={setGameReady}>Ready!</button>)
  } else {  
    toggle = (<p>Ready</p>)
  }

  return (
    <section className="setup">
      {/*Based on React Tips Docs on Radio Button implementation*/ }
        <div>
          <label>
            <input
              type="radio"
              name="user-type"
              value="player"
              checked={buttonState === "player"}
              onChange={handleButtonChange}
            />
            Player
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="user-type"
              value="observer"
              checked={buttonState === "observer"}
              onChange={handleButtonChange}
            />
            Observer
          </label>
        </div>

      {toggle}

      <p>Other players: </p>
    </section>
  )
}

export default Setup;