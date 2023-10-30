import React from "react";
import Cards from "./Cards";
import css from './CardsContainer.module.css'

const CardsContainer = (props) => {
  const { dogs } = props;
  return (
    <div className={css.cardsContainer}>
      {dogs?.map((e) => {
        return (
          <Cards
            key={e.id} 
            id={e.id}
            reference_image_id={e.reference_image_id}
            name= {e.name}
            weightMin={e.weightMin}
            weightMax={e.weightMax}
            temperaments={e.temperaments}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
