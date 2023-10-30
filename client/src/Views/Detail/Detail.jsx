import React, { useEffect } from "react";
import { getDogById } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import css from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch]);

  const dogId = useSelector((state) => state?.dogId);

  return (
    <div className={css.background}>
      
      <div className={css.containerCard}>
        <h2>
          {dogId?.id} - {dogId?.name}
        </h2>

        <img className={css.containerImg} src={dogId?.reference_image_id} alt="" />


        <div className={css.dogInformation}>
          <h3>Promedio edad: {dogId?.life_span}</h3>
          <div className={css.hywInformation}>
            <div className={css.heightInformation}>
              <h3>Altura min: {dogId?.heightMin}</h3> -
              <h3>Altura max: {dogId?.heightMax}</h3>
            </div>
            <div className={css.weightInformation}>
              <h3>Peso min: {dogId?.weightMin}</h3> -
              <h3>Peso max: {dogId?.weightMax}</h3>
            </div>
          </div>
          <div className={css.temperamentsInformation}>
            {dogId?.temperaments.map((temperament, index) => (
              <span key={index}> {temperament} </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
