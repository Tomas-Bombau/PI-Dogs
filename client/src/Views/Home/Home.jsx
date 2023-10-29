import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../Redux/Actions/actions";
import {Link} from 'react-router-dom'
import CardsContainer from "../../Components/Cards/CardsContainer";
import css from "./Home.module.css";
import NoDogs from "../../Components/NoDogs/NoDogs"
import Pagination from "../../Components/Pagination/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8)
  const lastDogIndex = currentPage * dogsPerPage
  const indexOfFirstDog = lastDogIndex - dogsPerPage
  const currentDogs = dogs?.slice(indexOfFirstDog, lastDogIndex)

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleReaload = (event) =>{
    event.preventDefault()
    dispatch(getDogs())
  }
  
  const handleOrder = (event) =>{
    event.preventDefault()
    // dispatch(order(event.value))
  }
  
  // const handleSource = (event) => {
  //   event.preventDefault()
  //   const getBySource = event.target.value
  //   // dispatch(X(getBySource))
  // }  
  
  if (loading) {
    return <div> Loading... </div>;
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
            {temperaments.map((temperament, index) => (
              <option key={index} value={temperament}>{temperament}</option>
            ))}
          </select>
          <select name="order" id="">
            <option value="todos">Todos </option>
            <option value="db"> Creados </option>
            <option value="api"> Existentes</option>
          </select>
        </div>
      </section>
      <Pagination dogsPerPage={dogsPerPage} dogs={dogs.length} pagination={pagination}/>
      {dogs.length === 0 ? <NoDogs />: 
      <CardsContainer dogs={currentDogs} />}
    </div>
  );
};

export default Home;
