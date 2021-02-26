import React from 'react';

import Aux from './Aux';

const Guesses = (props) => {
  const guesses_view = props.users.map((obj) => {
    const user_view = obj.guesses.map((_, j) => {
      return (
        <div key={j}>
          <span style={{marginRight: '10px'}}><strong>{j + 1}.</strong></span>
          <span style={{marginRight: '10px'}}>{obj.guesses[j]}</span>
          <span style={{marginRight: '10px'}}>{obj.bulls[j]}</span>
        </div>
      )
    })

    return (
      <div style={{display: 'inline-block', marginRight: '20px', marginBottom: '20px'}}>
        <span>{obj.username}</span>
        {user_view}
      </div>
    )
  })

  return (
    <div>
      {guesses_view}
    </div>
  )
}

export default Guesses;