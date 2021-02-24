// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "milligram";
import "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html";

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ch_join, ch_login, ch_push, ch_reset } from './socket';

import Login from './containers/Login';
import Setup from "./containers/Bulls/Setup";
import Bulls from "./containers/Bulls/Bulls";

import Guesses from './components/Guesses';
import Message from './components/Message';
import Controls from './components/Controls';

function App(_) {

  const [state, setState] = useState({
    gameName: '',
    user: null,
    gameReady: null,
    // eventually put this in a game object
    player: null,
    bulls: [],
    guesses: [],
    gameOver: null,
    message: null,
  });

  console.log(state)

  useEffect(() => {
    ch_join(setState)
  });

  function makeGuess(guess) {
    ch_push(guess)
  }

  function newGameHandler() {
    ch_reset()
  }

  function loginHandler(username, gameName) {
    ch_login(username)
  }

  let body = null;

  if (!(state.user)) {
    body = <Login login={loginHandler}/>
  }
  else {
    // if (!state.gameReady) {
    //   body = <Setup />
    // }
    // else {
      body = <div>
        <p>Welcome {state.user}</p>
        <Bulls game={state} guessed={makeGuess} newGame={newGameHandler}/>
        </div>
    // }
  }

  return body
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);