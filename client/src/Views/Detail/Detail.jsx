import React, { useEffect, useState } from "react";
import { getDogById } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  }, []);

  const dogId = useSelector((state) => state?.dogId);
  const dogIdCount = useSelector((state) => state?.dogIdCount);

  if (detailId.length === 36) {
    dogId.id = `Perro creado n° ${dogIdCount}`
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
