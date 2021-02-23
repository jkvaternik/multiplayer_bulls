import React, { useState } from 'react';

import Aux from './Aux';

const Controls = (props) => {

  const [text, setText] = useState('');

  function updateGuess(ev) {
    let text = ev.target.value;
    if (text.length > 4) {
      text = text.slice(0, 4);
    }
    setText(text)
  }

  function keypress(ev) {
    if (ev.key === "Enter") {
      props.guessed(text);
      setText('')
    }
  }

  return (
    <Aux>
      <input
        type="text"
        value={text}
        onChange={updateGuess}
        onKeyPress={keypress}></input>
      <button id="enter" onClick={() => { props.guessed(text); setText('') }}>OK</button>
    </Aux>
  )
}

export default Controls;