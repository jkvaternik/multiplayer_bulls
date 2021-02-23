import React from 'react';

import styles from '../../css/error.css'

const Error = (props) => {
  return (
    <div className="Error">
      <h4>{props.message}</h4>
    </div>
  )
}

export default Error;