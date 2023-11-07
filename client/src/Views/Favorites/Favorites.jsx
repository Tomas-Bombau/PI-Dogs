//Hooks
import { useSelector } from "react-redux";

//Components
import Cards from "../../Components/Cards/Cards";
import NoDogs from "../../Components/NoDogs/NoDogs";

//CSS
import css from "./Favorite.module.css";

const Favorites = () => {
  const favoritesDogs = useSelector((state) => state?.favorites);

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
