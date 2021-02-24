import React, { useState } from 'react';
import { ch_join } from '../socket';

const Login = (props) => {
  const [userName, setUser] = useState('')
  const [gameName, setGame] = useState('')

  return (
    <section>
      <h2 style={{ margin: "2.0rem 0" }}>4digits</h2>
      <h4 style={{ margin: "2.0rem 0" }}>Game Login</h4>
      <input
        type="text"
        value={userName}
        onChange={(ev) => setUser(ev.target.value)} 
        placeholder="Username"/>
      <input
        type="text"
        value={gameName}
        onChange={(ev) => setGame(ev.target.value)}
        placeholder="Game Name" />
      <button onClick={() => props.login(userName, gameName)}>
        Login
      </button>
    </section>
  );
}

export default Login;