import React from 'react';

import Aux from './Aux';

const Guesses = (props) => {
  const guesses_view = props.guesses.guesses.map((guess, i) => {
    return (
      <Aux key={i}>
        <p style={{ marginRight: '10px' }}><strong>{i + 1}.</strong></p>
        <p style={{ marginRight: '10px' }}>{guess}</p>
        <p>{props.guesses.bulls[i]}</p>
      </Aux>
    )
  })

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      {guesses_view}
    </div>
  )
}

export default Guesses;