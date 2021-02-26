import React, { useState } from 'react';

import Aux from './Aux';

const Controls = (props) => {

  const [text, setText] = useState('');

  function getError(g) {
    if (isNaN(g)) {
        return "Please input a number";
    } else if (g.length < 4) {
        return "Please input 4 digits";
    } else if (!areDigitsUnique(g)) {
        return "Four digits must be unique";
    } else {
        return "";
    }
  }

  // determines whether or not all the digits in a number are unique
  function areDigitsUnique(x) {
    return (new Set(x.toString().split(''))).size === x.length;
  }

  function updateGuess(ev) {
    let text = ev.target.value;
    if (text.length > 4) {
      text = text.slice(0, 4);
    }
    setText(text)
  }

  function enter() {
    let e = getError(text);
    if (e === "") {
      props.guessed(text); 
      setText('');
    } else {
      props.error(e);
      setText('');
    }
  }

  function keypress(ev) {
    if (ev.key === "Enter") {
      enter();
    }
  }

  return (
    <Aux>
      <input
        type="text"
        value={text}
        onChange={updateGuess}
        onKeyPress={keypress}></input>
      <button
        id="enter"
        style={{ marginRight: '15px' }}
        onClick={enter}>
        OK
      </button>
      <button
        id="pass"
        style={{ backgroundColor: 'salmon', borderColor: 'salmon' }}
        onClick={() => { props.guessed(''); setText('') }}>
        PASS
      </button>
    </Aux>
  )
}

export default Controls;