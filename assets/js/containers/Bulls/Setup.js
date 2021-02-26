import React, { useState } from 'react';

const Setup = (props) => {

  const [buttonState, setButtonState] = useState("observer");
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
        <span style={{marginRight: '10px'}}><strong>{props.users[j].username}.</strong></span>
        <span style={{marginRight: '10px'}}>Wins: {props.users[j].wins}</span>
        <span style={{marginRight: '10px'}}>Losses: {props.users[j].losses}</span>
      </div>
    )
  })

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

      <p>Winners: {props.state}</p>
      <div>Overall: {user_view}</div>

    </section>
  )
}

export default Setup;