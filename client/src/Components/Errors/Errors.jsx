import React from 'react'
import css from './Errors.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetErrorID } from '../../Redux/Actions/actions'

const Errors = (props) => {

const dispatch = useDispatch()
const clickResetErrors = () => {
  dispatch(resetErrorID())
}

  return (
    <div className={css.errors}>
        {" "}
        We are sorry: {props.error}{" "}
        <Link to="/">
          <button onClick={clickResetErrors}> Go back </button>
        </Link>
      </div>
  )
}

export default Errors