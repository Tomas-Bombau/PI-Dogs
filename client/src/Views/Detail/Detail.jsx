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
            <p> <b>Esperanza de vida promedio:</b> {dogId?.life_span}</p>
            <div className={css.hywInformation}>
              <p>
              <b> Altura min:</b> {dogId?.heightMin} - <b> Altura max: </b> {dogId?.heightMax}
              </p>
              <p>
                <b>Peso min:</b> {dogId?.weightMin} - <b>Peso max:</b> {dogId?.weightMax}{" "}
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
