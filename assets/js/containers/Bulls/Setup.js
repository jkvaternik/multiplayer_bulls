import React, { useState } from 'react';

import Aux from '../../components/Aux';

const Setup = (props) => {

  const [buttonState, setButtonState] = useState("observer");

  let ready = props.username.ready;
  let toggle = null;

  function handleButtonChange(ev) {
    if (!props.username.ready) {
      let type = ev.target.value
      setButtonState(type);
      props.setPlayer(type == "player")
    }
  }

  const user_view = props.users.map((_, j) => {
    return (
      <div key={j}>
        <span style={{ marginRight: '10px' }}><strong>{props.users[j].username}.</strong></span>
        <span style={{ marginRight: '10px' }}>Wins: {props.users[j].wins}</span>
        <span style={{ marginRight: '10px' }}>Losses: {props.users[j].losses}</span>
      </div>
    )
  })

  if (buttonState === "player") {
    toggle = ready ? (
      <Aux>
        <h6>Waiting for other players. If you're not ready, click below again.</h6>
        <button className="btn btn-primary" onClick={props.playerReady}>Not Ready :(</button>
      </Aux>)
      :
      (
        <Aux>
          <h6>Ready?</h6>
          <button className="btn btn-primary" onClick={props.playerReady}>Ready!</button>
        </Aux>
      )

  } else {
    toggle = (<button className="btn btn-primary" disabled>Ready!</button>)
  }

  return (
    <section className="setup">
      <h2 style={{ margin: "2.0rem 0" }}>4digits</h2>
      <h4>Welcome {props.username.name}!</h4>
      <h4>Pick a role:</h4>
      {/*Based on React Tips Docs on Radio Button implementation*/}
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

      <h4>Winners: {props.state}</h4>
      <h4>Overall: {user_view}</h4>

    </section>
  )
}

export default Setup;