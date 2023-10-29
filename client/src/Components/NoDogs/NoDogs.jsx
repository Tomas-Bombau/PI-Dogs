import React from "react";
import css from "./NoDogs.module.css";
import errorImage from "../../assets/error-image.jpeg";

const NoDogs = () => {
  return (
    <div className={css.noDogs}>
        <img src={errorImage}/>
        <h1>No se han encontrado perros con los parámetros provistos...</h1>
    </div>
  );
};

export default NoDogs;
