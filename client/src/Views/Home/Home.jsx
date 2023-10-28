import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../Redux/Actions/actions";
import CardsContainer from "../../Components/Cards/CardsContainer";


const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getDogs()).then(() => {
      setLoading(false); // Set loading state to false when the data is fetched
    });
  }, [dispatch]);

  const dogs = useSelector((state) => state?.allDogs);

  if (loading) {
    return <div>Loading...</div>; // You can display a loading spinner or message while data is being fetched
  }

  return (
    <div>
      <h1>CARDS</h1>
      <CardsContainer dogs={dogs}/>;
    </div>
  );
};

export default Home;
