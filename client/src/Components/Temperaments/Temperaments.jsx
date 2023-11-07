//CSS
import css from './Temperaments.module.css'

const Temperaments = (props) => {
  const { temperaments } = props;
  return (
    <div className={css.temperamentContainer}>
      {temperaments.map((temperament, index) => (
        <span key={index}> {temperament} </span>
      ))}
    </div>
  );
};

export default Temperaments;
