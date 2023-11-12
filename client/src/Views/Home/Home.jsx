import React from "react";
//Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Components and Functions
import {
  filterSource,
  filterTemperament,
  getDogs,
  getTemperaments,
  orderName,
  orderWeight,
} from "../../Redux/Actions/actions";
import CardsContainer from "../../Components/Cards/CardsContainer";
import NoDogs from "../../Components/NoDogs/NoDogs";
import Pagination from "../../Components/Pagination/Pagination";

//CSS
import css from "./Home.module.css";
import headerImage from "../../assets/home-header.webp";
import Loading from "../../Components/Loading/Loading";
import Footer from "../../Components/Footer/Footer";
import Errors from "../../Components/Errors/Errors";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");
  const [aux, setAux] = useState(true);



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
  }, [dispatch]);

  const dogs = useSelector((state) => state?.allDogs);
  const temperaments = useSelector((state) => state?.allTemperaments);


  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const lastDogIndex = currentPage * dogsPerPage;
  const indexOfFirstDog = lastDogIndex - dogsPerPage;
  const currentDogs = dogs?.slice(indexOfFirstDog, lastDogIndex);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReaload = (event) => {
    event.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
  };

  const handleOrder = (event) => {
    event.preventDefault();
    const value = event.target.value;
    value === "crec" || value === "decre"
      ? dispatch(orderWeight(value))
      : dispatch(orderName(value));
    setCurrentPage(1);
    setAux(!aux); //Esto me permite actualizar el estado y renderizar nuevamente la pagina. REACT no toma el el sort como un cambio de arreglo, porque el sort solo hace cambiar de posicion los elementos.
  };

  const handleTemperaments = (event) => {
    event.preventDefault();
    const value = event.target.value;
    dispatch(filterTemperament(value));
  };

  const handleSource = (event) => {
    event.preventDefault();
    const value = event.target.value;
    dispatch(filterSource(value));
    setCurrentPage(1);
  };

  if (loading) {
    return <Loading />;
  }

  if (errors) {
    return <Errors error={errors} />;
  }

  return (
    <div>
      <main className={css.homeContainer}>
        <header className={css.headerImage}>
          <img src={headerImage} alt="dog-sleep" />
          <h1> PI Henry</h1>
          <div>
            <Link to="/create">
              <button> Crear Raza</button>
            </Link>
          </div>
        </header>
        <section className={css.options}>
          <button onClick={handleReaload}>Recargar razas </button>
          <select name="order" onChange={handleOrder}>
            <option value="a-z"> Razas A - Z </option>
            <option value="z-a"> Razas Z - A </option>
            <option value="crec"> Razas más livianas </option>
            <option value="decre"> Razas más pesadas </option>
          </select>
          <select name="temperaments" onChange={handleTemperaments}>
            <option value="todos"> Todos </option>
            {temperaments.map((temperament, index) => (
              <option key={index} value={temperament}>
                {temperament}
              </option>
            ))}
          </select>
          <select onChange={handleSource} name="order" id="">
            <option value="todos"> Todos </option>
            <option value="db"> Razas creadas </option>
            <option value="api"> Razas existentes</option>
          </select>
        </section>
        <Pagination
          dogsPerPage={dogsPerPage}
          dogs={dogs.length}
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {dogs.length === 0 ? <NoDogs /> : <CardsContainer dogs={currentDogs} />}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
