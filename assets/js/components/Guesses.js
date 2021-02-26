import React from 'react';

import Aux from './Aux';

const Guesses = (props) => {
<<<<<<< HEAD
  // const guesses = Object.entries(props.guesses.guesses);
  // const bulls = Object.values(props.guesses.bulls);
=======
  const users = Object.keys(props.guesses.guesses);
  const guesses = Object.values(props.guesses.guesses);
  const bulls = Object.values(props.guesses.bulls);
>>>>>>> 4ba287ea08c7d214e078f1389e0642b3d0809359

  let results = users.map((user, i) => {
    return {
      user: user,
      guesses: guesses[i],
      bulls: bulls[i]
    }
  })

  const guesses_view = results.map((obj) => {

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
        <span>{obj.user}</span>
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