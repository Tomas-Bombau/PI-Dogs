//assets
import detailImage from "../../assets/detail-image.png";

//Components and Functions
import Temperaments from "../Temperaments/Temperaments";
import { addFav, deleteDog, removeFav } from "../../Redux/Actions/actions";

//Hooks
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//CSS
import css from "./Cards.module.css";
import { useEffect, useState } from "react";

const Cards = (props) => {
  const {
    id,
    reference_image_id,
    weightMin,
    weightMax,
    name,
    temperaments,
    createdInDb,
  } = props;
  
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state?.favorites);

  useEffect(() => {
    favorites.forEach((favorite) => {
      if (favorite.id == props.id) {
        setFav(true);
      }
    });
  }, [favorites]);

  const deleteHandler = async (id) => {
    const newId = { id: id };
    dispatch(await deleteDog(newId));
  };

  const handleFavorite = () => {
    return fav ? dispatch(removeFav(id)) : dispatch(addFav(id));
  };

  return (
    <div className={css.cards}>
      {fav ? (
        <button className={!fav ? css.like : css.unlike} onClick={handleFavorite}>
          {" "}
          ❤️{" "}
        </button>
      ) : (
        <button className={!fav ? css.like : css.unlike} onClick={handleFavorite}>
          {" "}
          🤍{" "}
        </button>
      )}
      <Link className={css.link} to={`/detail/${id}`}>
        <img className={css.imagen} src={detailImage} alt="access-to-details" />
      </Link>
      <img src={reference_image_id} alt="" />
      <h2>{name}</h2>
      {createdInDb ? (
        <p className={css.eliminar} alt="" onClick={() => deleteHandler(id)}>
          {" "}
          X{" "}
        </p>
      ) : null}
      <div className={css.weight}>
        <p>Min weight: {weightMin}</p>
        <p>Max weight: {weightMax}</p>
      </div>
      <Temperaments key={id} temperaments={temperaments} />
    </div>
  );
};

export default Cards;
