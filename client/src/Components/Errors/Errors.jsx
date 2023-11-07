//Hooks
import { useNavigate } from 'react-router-dom'

//CSS
import css from './Errors.module.css'

const Errors = (props) => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={css.errors}>
        {" "}
        Lo sentimos, {props.error}{" "}
          <button onClick={goBack}> Go back </button>
      </div>
  )
}

export default Errors