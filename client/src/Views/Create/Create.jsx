import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog } from "../../Redux/Actions/actions";

const Create = () => {

  const dispatch = useDispatch()

  const allTemperaments = useSelector((state) => state.allTemperaments);
  const [dog, setDog] = useState({
    reference_image_id:"",
    life_span: "",
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    temperaments: [],
  });

  const formHandler = (event) => {
    let property = event.target.name;
    let value = event.target.value
    setDog({...dog, [property]: value})
    console.log({...dog, [property]: value})
  };

  const temperamentsHandler = (event) => {
    const temperamentChoice = event.target.value

    setDog({...dog, temperaments: [...dog.temperaments, temperamentChoice]})
    console.log({...dog, temperaments: [...dog.temperaments, temperamentChoice]})
  }
  
  const submitForm = (event) => {
    event.preventDefault()
    dispatch(postDog(dog))
  }

  return (
    <form onSubmit={submitForm} action="">
      <label htmlFor="">
        {" "}
        Nombre de raza
        <input onChange={formHandler} type="text" name="name" placeholder="Ejemplo: Raza Retriever"/>
      </label>

      <div>
        <label htmlFor="">
          {" "}
          Altura Min:
          <input onChange={formHandler} type="number" name="heightMin" />
        </label>
        <label htmlFor="">
          {" "}
          Altura Max:
          <input onChange={formHandler} type="number" name="heightMax" />
        </label>
      </div>

      <div>
        <label htmlFor="">
          {" "}
          Peso Min:
          <input onChange={formHandler} type="number" name="weightMin" />
        </label>
        <label htmlFor="">
          Peso Max:
          <input onChange={formHandler} type="number" name="weightMax" />
        </label>
      </div>

      <label htmlFor="">
        {" "}
        Promedio de vida: 
        <input onChange={formHandler} type="text" name="life_span" placeholder="Ejemplo: 11 - 13 años"/>
      </label>

      <label htmlFor="">
        {" "}
        Ingrese la url con la imagen del perro:
        <input onChange={formHandler} type="url"  name="reference_image_id"/>
      </label>

      <select onChange={temperamentsHandler}  htmlFor="">
        {allTemperaments.map((temperament, index) => (
          <option key={index} value={temperament}> {temperament} </option>
        ))}
      </select>

      <button>Enviar formulario</button>
    </form>
  );
};

export default Create;
