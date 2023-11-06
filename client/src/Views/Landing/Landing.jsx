import React from "react";
import css from "./Landing.module.css";
import {Link} from 'react-router-dom'
import video from "../../assets/landing-video.mp4"

const Landing = () => {
  return (
      <div className={css.background}>
        <video src={video} autoPlay loop muted></video>
        <div className={css.container}>
          <h1>Dogs PI</h1>
          <p>Si sos amante de los <strong>perros</strong>, este es tu lugar. Ingresá y conocé a las más de <strong> 170 razas  </strong> existentes con sus fotos, sus características y más...</p>
          <p>Animate, dejá volar tu imaginación y jugá también creando tu propio perro.</p>
          <Link to={'/home'}> <button>Ingresar</button> </Link>
        </div>
      </div>
  );
};

export default Landing;
