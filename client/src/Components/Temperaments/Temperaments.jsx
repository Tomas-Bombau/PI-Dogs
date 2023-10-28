import React from "react";
import css from './Temperaments.module.css'

const Temperaments = (props) => {
  const { temperaments } = props;
  return (
    <div className={css.hola}>
      {temperaments.map((temperament) => (
        <span> {temperament} </span>
      ))}
    </div>
  );
};

export default Temperaments;
