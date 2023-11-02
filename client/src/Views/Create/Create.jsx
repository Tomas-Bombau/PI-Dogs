import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog } from "../../Redux/Actions/actions";
import validation from "./validation";
import validationTemperaments from "./validationTemperaments";

const Create = () => {
  const dispatch = useDispatch();

  const allTemperaments = useSelector((state) => state.allTemperaments);
  const [dog, setDog] = useState({
    reference_image_id: "",
    life_span: "",
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({
    name: "Campo requerido",
  });

  const [chosenTemperaments, setchosenTemperaments] = useState({});

  const formHandler = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    setDog({ ...dog, [property]: value });
    setErrors(validation({ ...dog, [property]: value }));
  };

  const temperamentsHandler = (event) => {
    const temperamentChoice = event.target.value;
    setDog({ ...dog, temperaments: [...dog.temperaments, temperamentChoice] });
    setchosenTemperaments(
      validationTemperaments({
        ...dog,
        temperaments: [...dog.temperaments, temperamentChoice],
      })
    );
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(postDog(dog));
    }

  return (
    <form onSubmit={submitForm} action="">
      <label htmlFor="">
        {" "}
        Nombre de raza
        <input
          onChange={formHandler}
          type="text"
          name="name"
          placeholder="Ejemplo: Raza Retriever"
          required
        />
      </label>
      {errors.name ? <p>{errors.name}</p> : null}

      {!errors.name && (
        <div>
          <label htmlFor="">
            {" "}
            Altura Min (cm): </label>
            <input
              onChange={formHandler}
              type="number"
              name="heightMin"
              required
            />
          {errors.heightMin && <p>{errors.heightMin}</p>}
          <label htmlFor="">
            {" "}
            Altura Max (cm): </label>
            <input
              onChange={formHandler}
              type="number"
              name="heightMax"
              required
            />
          {errors.heightMax && <p>{errors.heightMax}</p>}
        </div>
      )}

      {!errors.name && !errors.heightMin & !errors.heightMax && (
        <div>
          <label htmlFor="">
            {" "}
            Peso Min:
            <input onChange={formHandler} type="number" name="weightMin" />
            {errors.weightMin ? <p>{errors.weightMin}</p> : null}
          </label>
          <label htmlFor="">
            Peso Max:
            <input onChange={formHandler} type="number" name="weightMax" />
            {errors.weightMax ? <p>{errors.weightMax}</p> : null}
          </label>
        </div>
      )}

  {!errors.name && !errors.heightMin && !errors.heightMax && !errors.weightMin && !errors.weightMax && 
      <label htmlFor="">
        {" "}
        Promedio de vida:
        <input
          onChange={formHandler}
          type="text"
          name="life_span"
          placeholder="Ejemplo: 11 - 13 años"
        />
        {errors.life_span ? <p>{errors.life_span}</p> : null}
      </label>
}

{/*
      <label htmlFor="">
        {" "}
        Ingrese la url con la imagen del perro:
        <input onChange={formHandler} type="url" name="reference_image_id" />
        {errors.reference_image_id ? <p>{errors.reference_image_id}</p> : null}
      </label>


      <select onChange={temperamentsHandler} htmlFor="">
        <option value=""> -- Elige las opciones que quieras-- </option>
        {allTemperaments.map((temperament, index) => (
          <option key={index} value={temperament}>
            {" "}
            {temperament}{" "}
          </option>
        ))}
        {chosenTemperaments.choice ? (
          <p> {chosenTemperaments.choice} </p>
        ) : null}
      </select> */}

      <button>Enviar formulario</button>
    </form>
  );
};

export default Create;
