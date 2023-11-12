//Hooks
import { useDispatch, useSelector } from "react-redux";

//Components
import Cards from "../../Components/Cards/Cards";
import NoDogs from "../../Components/NoDogs/NoDogs";

//CSS
import css from "./Favorite.module.css";
import { useEffect, useState } from "react"; 
import { getDogs, getTemperaments } from "../../Redux/Actions/actions";
import Loading from "../../Components/Loading/Loading";
import Errors from "../../Components/Errors/Errors";

const Favorites = () => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    dispatch(getDogs())
      .then(dispatch(getTemperaments()))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setErrors(error.message);
        setLoading(false);
      });
  }, []);

  const favoritesDogs = useSelector((state) => state?.favorites);

  
  if (loading) {
    return <Loading />;
  }

  if (errors) {
    return <Errors error={errors} />;
  }

  return (
    <div className={css.favoriteContainer}>
      <h1>Mis favoritos</h1>
      <div className={css.cardsContainer}>
        {favoritesDogs.length == 0 ? (
          <NoDogs />
        ) : (
          favoritesDogs.map((e) => {
            return (
              <Cards
                key={e.id}
                id={e.id}
                reference_image_id={e.reference_image_id}
                name={e.name}
                weightMin={e.weightMin}
                weightMax={e.weightMax}
                temperaments={e.temperaments}
                createdInDb={e.createdInDb}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favorites;
