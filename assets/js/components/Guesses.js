import React from 'react';

import Aux from './Aux';

const Guesses = (props) => {
  const guesses = Object.entries(props.guesses.guesses);
  const bulls = Object.values(props.guesses.bulls);

  const results = guesses.map(([user, guess]) => guess.map((g, i) => {
    return {user: user, guesses: guess, bulls: bulls[i]}
  }))

  console.log(Object.values(results))
  const guesses_view = Object.values(results).map(([user, gs, bs]) => gs.map((_, i) => {
    return (
            <Aux key={i}>
              <p style={{ marginRight: '10px' }}><strong>{i + 1}.</strong></p>
              <p style={{ marginRight: '10px' }}>{user}: {gs[i]}</p>
              <p style={{ marginRight: '10px' }}>{bs[i]}</p>
            </Aux>
    )
  }))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      {guesses_view}
    </div>
  )
}

export default Guesses;