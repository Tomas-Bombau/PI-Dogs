import React from 'react'
import css from './Errors.module.css'
import { Link } from 'react-router-dom'

const Errors = (props) => {

  return (
    <div className={css.errors}>
        {" "}
        We are sorry: {props.error}{" "}
        <Link to="/">
          <button> Go back </button>
        </Link>
      </div>
  )
}

export default Errors