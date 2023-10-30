import React from "react";
import Temperaments from "../Temperaments/Temperaments";
import css from "./Cards.module.css";
import detailImage from '../../assets/detail-image.png'
import {Link} from 'react-router-dom'
 

const Cards = (props) => {
  const { id, reference_image_id, weightMin, weightMax, name, temperaments } =
    props;
  return (
    <div className={css.cards}>
      <Link className={css.link} to={`/detail/${id}`}><img className={css.imagen} src={detailImage} alt="" /></Link>
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
