//assets
import errorImage from "../../assets/error-image.jpeg";

//CSS
import css from "./NoDogs.module.css";

const NoDogs = () => {
  return (
    <div className={css.noDogs}>
        <img src={errorImage} alt="imagen-perro-compuutadora"/>
        <h1>No se han encontrado perros con los parámetros provistos...</h1>
    </div>
  );
};

export default NoDogs;
