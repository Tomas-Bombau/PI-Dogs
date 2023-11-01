import React from "react";
//Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//Components and Functions
import { getDogById } from "../../Redux/Actions/actions";

//CSS
import css from "./Detail.module.css";

const Detail = () => {
  const params = useParams();
  const detailId = params.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getDogById(detailId))
    .then(() => {
      setLoading(false); 
    });;
  }, [detailId, dispatch]);

  const dogId = useSelector((state) => state?.dogId);

  if (detailId.length === 36) {
    dogId.id = "Nueva Raza"
  }

  if (loading) {
    return <div> Loading... </div>;
  } 

  return (
    <section className={css.background}>
      <div className={css.dogDetail}>
        <div className={css.img}>
          <img src={dogId?.reference_image_id} alt="" />
        </div>
        <div className={css.dogInformation}>
          <div>
            <h2>
              {dogId?.id} - {dogId?.name}
            </h2>
          </div>
          <div className={css.dogInfo}>
            <p>
              {" "}
              <b>Esperanza de vida promedio:</b> {dogId?.life_span}
            </p>
            <div className={css.hywInformation}>
              <p>
                <b> Altura min:</b> {dogId?.heightMin} - <b> Altura max: </b>{" "}
                {dogId?.heightMax}
              </p>
              <p>
                <b>Peso min:</b> {dogId?.weightMin} - <b>Peso max:</b>{" "}
                {dogId?.weightMax}{" "}
              </p>
            </div>
            <p className={css.temperamentsInformation}>
              {dogId.temperaments?.map((temperament, index) => (
                <span key={index}> {temperament} </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
