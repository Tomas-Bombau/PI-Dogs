import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../Redux/Actions/actions";
import {Link} from 'react-router-dom'
import CardsContainer from "../../Components/Cards/CardsContainer";
import css from "./Home.module.css";
import NoDogs from "../../Components/NoDogs/NoDogs"

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

const handleReaload = (event) =>{
  event.preventDefault()
  dispatch(getDogs())
}

const handleOrder = (event) =>{
  event.preventDefault()
  // dispatch(order(event.value))
}
  
  
  return (
    <div>
      <section className={css.homeContainer}>
        <h1>Bienvenidos al mundo de los perros!</h1>
        <div>
          <Link to='/create'><button>Crear perro</button></Link>
          <button onClick={handleReaload}>Recargar perros</button>
          <select name="order" id="">
            <option onClick={handleOrder} value="asc">Ascendente</option>
            <option onClick={handleOrder} value="desc">Descendente</option>
          </select>
          <select name="temperaments" id="">
            {temperaments.map((temperament) => (
              <option value={temperament}>{temperament}</option>
            ))}
          </select>
        </div>
      </section>
      {dogs.length === 0 ? <NoDogs />: 
      <CardsContainer dogs={dogs} />}
    </div>
  );
};

export default Home;
