import React from "react";
import css from "./Landing.module.css";
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
      <div className={css.background}>
        <div className={css.container}>
          <h1>Dog PI</h1>
          <p>Si sos amante de los <strong>perros</strong>, este es tu lugar. Ingresá y conocé a las más de 200 razas existentes con sus fotos, sus características y más </p>
          <p>Animate y jugá también creando la propia</p>
          <Link to={'/home'}> <button>Ingresar</button> </Link>
        </div>
      </div>
  );
};

export default Landing;
