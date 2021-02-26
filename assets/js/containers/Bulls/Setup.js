import React, { useState } from 'react';

const Setup = (props) => {

  const [state, setState] = useState(props.state);
  const [buttonState, setButtonState] = useState("observer");
  let toggle = null;

  function handleButtonChange(ev) {
    if (!state.ready) {
      let type = ev.target.value
      setButtonState(type);
      props.setPlayer(type == "player")
    }
  }

  if (buttonState === "player") {
    toggle = (<button className="btn btn-primary" onClick={props.playerReady}>Ready!</button>)
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