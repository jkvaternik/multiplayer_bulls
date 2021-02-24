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

import { ch_join, ch_push, ch_reset } from './socket';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Login from './containers/Login';
import Setup from "./containers/Bulls/Setup";
import Bulls from "./containers/Bulls/Bulls";

function App(_) {

  const [state, setState] = useState({
    gameName: null,
    userName: null,
    gameReady: null,
    game: {
      player: null,
      bulls: [],
      guesses: [],
      gameOver: null,
      message: null,
    },
  });
/*
  let body = null;

  if (!(state.gameName && state.username)) {
    body = <Login />
  }
  else {
    if (!state.gameReady) {
      body = <Setup />
    }
    else {
      body = <Bulls game={state.game} />
    }
  }
*/

  let body = <Setup state={state}/>

  return (
    <section>
      {body}
    </section>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);