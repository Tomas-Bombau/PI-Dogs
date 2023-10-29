import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTemperament, getDogs, getTemperaments, orderName } from "../../Redux/Actions/actions";
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
    const value = event.target.value
    dispatch(orderName(value))
  }


  const handleTemperaments = (event) =>{
    event.preventDefault()
    const value = event.target.value
    dispatch(filterTemperament(value))
  }
  
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
          <select name="order" onChange={handleOrder} >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <select name="temperaments" onChange={handleTemperaments}>
            <option value='Todos'> Todos </option>
            {temperaments.map((temperament, index) => (
              <option key={index} value={temperament}>{temperament}</option>
            ))}
          </select>
          <select name="order" id="">
            <option value="todos"> Todos </option>
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
