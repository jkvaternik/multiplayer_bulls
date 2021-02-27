import React from 'react';

const Guesses = (props) => {
  const guesses_view = props.users.map((obj) => {
    if (obj.player) {
      const user_view = obj.guesses.map((_, j) => {
        return (
          <div key={j}>
            <span style={{ marginRight: '10px' }}><strong>{j + 1}.</strong></span>
            <span style={{ marginRight: '10px' }}>{obj.guesses[j]}</span>
            <span style={{ marginRight: '10px' }}>{obj.bulls[j]}</span>
          </div>
        )
      })

      return (
        <div style={{ display: 'inline-block', marginRight: '20px', marginBottom: '20px' }} key={obj.username}>
          <span>{obj.username}</span>
          {user_view}
        </div>
      )
    }
  })

  return (
    <div>
      {guesses_view}
    </div>
  )
}

export default Guesses;