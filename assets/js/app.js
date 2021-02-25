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

import { ch_join, ch_login, ch_push, ch_reset, ch_ready, ch_player } from './socket';

import Login from './containers/Login';
import Setup from "./containers/Bulls/Setup";
import Bulls from "./containers/Bulls/Bulls";

import Guesses from './components/Guesses';
import Message from './components/Message';
import Controls from './components/Controls';

function App(_) {
  const [username, setUsername] = useState({name: null, ready: false})

  const [state, setState] = useState({
    gameName: '',
    gameReady: null,
    users: [],
    // eventually put this in a game object
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
    setUsername({name: username, ready: false})
    ch_login(username, gameName)
  }

  function handlePlayerType(username, player) {
    ch_player(username, player)
  }

  function handlePlayerReady(username) {
    ch_ready(username);
  }

  let body = null;

  if (!username.name) {
    body = <Login login={loginHandler} />
  }
  else {
    if (!state.gameReady) {
      body = <Setup playerReady={handlePlayerReady} setPlayer={handlePlayerType} state={username}/>
     }
    else {
    body = (
      <div>
        <p>Welcome {username.name}</p>
        <Bulls game={state} guessed={makeGuess} newGame={newGameHandler} />
      </div>
    )
    }
  }

  // let body = <Setup state={state}/>

  return body;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);