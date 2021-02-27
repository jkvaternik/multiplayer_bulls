import React, { useState } from 'react';

import Message from '../components/Message';

const Login = (props) => {
  const [userName, setUser] = useState('')
  const [gameName, setGame] = useState('')
  const [error, setError] = useState("");

  function loginHandler() {
    if (!(userName === "" || gameName === "")) {
      props.login(userName, gameName)
      setError(null)
    }
    else {
      setError("Username or Game Name cannot be empty")
    }
  }

  return (
    <section>
      <h2 style={{ margin: "2.0rem 0" }}>4digits</h2>
      <h4 style={{ margin: "2.0rem 0" }}>Game Login</h4>
      {error ?
        <Message message={error} /> :
        null}
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
      <button onClick={loginHandler}>
        Login
      </button>
    </section>
  );
}

export default Login;