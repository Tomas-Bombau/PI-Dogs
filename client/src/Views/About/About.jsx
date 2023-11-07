import React from "react";

//assets
import githublogo from "../../assets/github-logo.jpg";
import linkedinlogo from "../../assets/linkedin-logo.png";
import prueba from "../../assets/prueba.jpg";
import twitter from "../../assets/twitter.png";
import javascript from "../../assets/js.png";
import html from "../../assets/html.png";
import css3 from "../../assets/css.png";
import git from "../../assets/git.png";
import sequelize from "../../assets/sequelize.png";
import node from "../../assets/nodejs.png";
import react from "../../assets/react.png";

//CSS
import css from "./About.module.css";

const About = () => {

  return (
    <div className={css.aboutContainer} >
      <div className={css.cardContainer}>
        <img className={css.profilePic} src={prueba} alt=""/>
        <div className={css.details}>
          <h1>Tomas Bombau <br /> <span>Front student 💻</span></h1>
          <div className={css.detailInfo}>
            <h2> ¡Hola a todos y todas! 👋</h2>
            <h4>
              Mi nombre es Tomás, tengo 33 años, soy Lic. en Comunicación e hincha de Racing Club. 
            </h4>
            <p>
              En noviembre de 2022 emprendí este camino del desarrollo web, el cual me entusiasma y me reta todos los días. He dedicado horas y horas en mi formación para perfeccionarme cada vez más. He aquí algunas de las tecnologías que aprendí a manejar en esta nueva aventura:{" "}
            </p>  
            <div className={css.tecnologies}>
              <img src={html} alt="html" />
              <img src={css3} alt="css3" />
              <img src={javascript} alt="v" />
              <img src={react} alt="v" />
              <img src={git} alt="git" />
              <img src={node} alt="node" />
              <img src={sequelize} alt="sequelize" />
            </div>
            <p> Queda mucho por recorrer. Así que si quieres seguir en contacto, acá abajo encontrarás mis redes sociales  </p>
            <div className={css.socialMedia}>
              <a
                href="https://github.com/Tomas-Bombau"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githublogo} alt="githublogo" />
              </a>
              <a
                href="https://www.linkedin.com/in/tom%C3%A1s-ignacio-bombau-049a52139/"
                rel="noreferrer"
                target="_blank"
              >
                <img src={linkedinlogo} alt="linkedin" />
              </a>
              <a href="" rel="noreferrer" target="_blank">
                <img src={twitter} alt="twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
