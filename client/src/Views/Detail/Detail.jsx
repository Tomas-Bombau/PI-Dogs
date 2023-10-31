import React, { useEffect, useState } from "react";
import { getDogById } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import css from "./Detail.module.css";

const Detail = () => {
  const params = useParams();
  const id = params.id;
  const detailId = Number(id);
  const dispatch = useDispatch();
  const [aux, setAux] = useState(detailId);

  useEffect(() => {
    dispatch(getDogById(detailId));
  }, [detailId]);

  const dogId = useSelector((state) => state?.dogId);
  const dogs = useSelector((state) => state?.allDogs);

  const numberOfDogs = dogs.length
  const lastId = dogs[numberOfDogs - 1].id


  const handleClickForward = () => {
    if(aux < lastId){
    dispatch(getDogById(aux + 1));
    setAux((aux) => aux + 1);
    } 
  };

  const handleClickBackward = () => {
    if (aux > 1) {
      dispatch(getDogById(aux - 1));
      setAux((aux) => aux - 1);
    }
  };


  return (
    <section className={css.background}>
      <div className={css.dogDetail}>
        <div className={css.img}>
          <img src={dogId?.reference_image_id} alt="" />
        </div>
        <div className={css.dogInformation}>
          <div>
            <h2>
              <span onClick={handleClickBackward}> &#8592; </span> {dogId?.id}{" "}
              {dogId?.name} <span onClick={handleClickForward}> &#8594; </span>
            </h2>
          </div>
          <div className={css.dogInfo}>
            <h3> Esperanza de vida promedio: {dogId?.life_span}</h3>
            <div className={css.hywInformation}>
              <h3>
                Altura min: {dogId?.heightMin} - Altura max: {dogId?.heightMax}
              </h3>
              <h3>
                Peso min: {dogId?.weightMin} - Peso max: {dogId?.weightMax}{" "}
              </h3>
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
