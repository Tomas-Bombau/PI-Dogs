import React from "react";
import Temperaments from "../Temperaments/Temperaments";
import css from "./Cards.module.css";

const Cards = (props) => {
  const { id, reference_image_id, weightMin, weightMax, name, temperaments } =
    props;
  return (
    <div className={css.cards}>
      <img src={reference_image_id} alt="" />
      <h2>{name}</h2>
      <div className={css.weight}>
        <p>Min weight: {weightMin}</p>
        <p>Max weight: {weightMax}</p>
      </div>
      <Temperaments key={id} temperaments={temperaments} />
    </div>
  );
};

export default Cards;
