import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../Redux/Actions/actions";
import CardsContainer from "../../Components/Cards/CardsContainer";
import css from "./Home.module.css";
import homeImage from "../../assets/home-img.jpg";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getDogs())
    .then(dispatch(getTemperaments()))
    .then(() => {
      setLoading(false); 
    }); 
  }, [dispatch]);

  const dogs = useSelector((state) => state?.allDogs);
  const temperaments = useSelector((state) => state?.allTemperaments);

  if (loading) {
    return <div> Loading... </div>;
  } 
  
  return (
    <div>
      <section className={css.homeContainer}>
        <h1>Bienvenidos al mundo de los perros!</h1>
        <div>
          <button>Recargar perros</button>
          <select name="order" id="">
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
          <select name="temperaments" id="">
            {temperaments.map((temperament) => (
              <option>{temperament}</option>
            ))}
          </select>
        </div>
      </section>
      <CardsContainer dogs={dogs} />;
    </div>
  );
};

export default Home;
