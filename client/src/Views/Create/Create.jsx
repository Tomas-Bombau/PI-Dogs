// Hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components and Functions
import { postDog } from "../../Redux/Actions/actions";

//Validations
import validation from "./validation";
import validationTemperaments from "./validationTemperaments";

//
import css from "./Create.module.css";

const Create = () => {
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(true);
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
    life_span: "Campo requerido",
  });
  const [chosenTemperaments, setchosenTemperaments] = useState({});
  const choices = chosenTemperaments?.choice;

  const allTemperaments = useSelector((state) => state.allTemperaments);

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
    setButtonDisabled(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(postDog(dog));
  };

  return (
    <section className={css.background}>
      <form className={css.formContainer} onSubmit={submitForm} action="">
        <label className={css.title} htmlFor="">
          {" "}
          Nombre de raza
          <div>
          <input
            onChange={formHandler}
            type="text"
            name="name"
            placeholder="Ejemplo: Raza Retriever"
            required
          />
          </div>
        </label>
        {errors.name ? <p>{errors.name}</p> : null}

        {!errors.name && (
          <div className={css.alturaContainer}>
            <label htmlFor=""> Altura Min (cm): 
            <input
              onChange={formHandler}
              type="number"
              name="heightMin"
              placeholder="0"
              required
            />
            {errors.heightMin && <p>{errors.heightMin}</p>}
            </label>
            <label htmlFor=""> Altura Max (cm): x
            <input
              onChange={formHandler}
              type="number"
              name="heightMax"
              placeholder="0"
              required
            />
            {errors.heightMax && <p>{errors.heightMax}</p>}
            </label>
          </div>
        )}

        {!errors.name && !errors.heightMin & !errors.heightMax && (
          <div>
            <label htmlFor="">
              {" "}
              Peso Min:
              <input
                onChange={formHandler}
                type="number"
                name="weightMin"
                placeholder="1"
                required
              />
              {errors.weightMin ? <p>{errors.weightMin}</p> : null}
            </label>
            <label htmlFor="">
              Peso Max:
              <input
                onChange={formHandler}
                type="number"
                name="weightMax"
                placeholder="0"
                required
              />
              {errors.weightMax ? <p>{errors.weightMax}</p> : null}
            </label>
          </div>
        )}
        {!errors.name &&
          !errors.heightMin &&
          !errors.heightMax &&
          !errors.weightMin &&
          !errors.weightMax && (
            <label htmlFor="">
              {" "}
              Promedio de vida:
              <input
                onChange={formHandler}
                type="text"
                name="life_span"
                placeholder="Ejemplo: 11 - 13 años"
                required
              />
              {errors.life_span ? <p>{errors.life_span}</p> : null}
            </label>
          )}

        {!errors.name &&
          !errors.heightMin &&
          !errors.heightMax &&
          !errors.weightMin &&
          !errors.weightMax &&
          !errors.life_span && (
            <label htmlFor="">
              {" "}
              Ingrese la url con la imagen del perro:
              <input
                onChange={formHandler}
                type="url"
                name="reference_image_id"
                placeholder="https://www.ejemplo.com/"
                required
              />
              {errors.reference_image_id ? (
                <p>{errors.reference_image_id}</p>
              ) : null}
            </label>
          )}

        {!errors.name &&
          !errors.heightMin &&
          !errors.heightMax &&
          !errors.weightMin &&
          !errors.weightMax &&
          !errors.life_span &&
          !errors.reference_image_id && (
            <select onChange={temperamentsHandler} htmlFor="" required>
              <option value=""> -- Elige las opciones que quieras-- </option>
              {allTemperaments.map((temperament, index) => (
                <option key={index} value={temperament}>
                  {" "}
                  {temperament}{" "}
                </option>
              ))}
            </select>
          )}

        {choices && (
          <div>
            Tus elecciones de temperamentos son las siguientes:
            {choices.map((e) => (
              <span> {e} </span>
            ))}
          </div>
        )}

        <button disabled={buttonDisabled}>Enviar formulario</button>
      </form>
    </section>
  );
};

export default Create;
