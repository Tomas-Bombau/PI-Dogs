//assets
import githublogo from "../../assets/github-logo.jpg";
import linkedinlogo from "../../assets/linkedin-logo.png";

//CSS
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={css.footer}>
      <div className={css.footerContainer}>
        <a href='https://github.com/Tomas-Bombau' target="_blank" rel="noreferrer" ><img src={githublogo} alt="" /></a>
        <a href='https://www.linkedin.com/in/tom%C3%A1s-ignacio-bombau-049a52139/'  rel="noreferrer" target="_blank"><img src={linkedinlogo} alt="" /></a>
      </div>
        <h4 className={css.name}> Created by Tomas Ignacio Bombau ©️ </h4>
    </div>
  );
};


export default Footer;
