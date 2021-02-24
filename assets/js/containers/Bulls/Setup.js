import React, { useState } from 'react';

const Setup = (appState) => {

  const [state, setState] = useState(appState);
  const [buttonState, setButtonState] = useState("player");
  let toggle = null;

  function handleButtonChange(ev) {
    if (!state.gameReady) {
      setButtonState(ev.target.value);
    }
  }

  function setGameReady() {
    setState({
      gameName: state.gameName,
      userName: state.useState,
      gameReady: true,
      game: {
        player: true,
        bulls: state.bulls,
        guesses: state.guesses,
        gameOver: state.gameOver,
        message: state.message,
      },
    })
    console.log(state)
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