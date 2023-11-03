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
    name: " ",
    heightMin: " ",
    heightMax: " ",
    weightMin: "",
    weightMax: "",
    life_span: "Campo requerido",
  });
  const [chosenTemperaments, setchosenTemperaments] = useState();
  const [count, setCount] = useState(1);
  const allTemperaments = useSelector((state) => state.allTemperaments);

  const formHandler = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    setDog({ ...dog, [property]: value });
    setErrors(validation({ ...dog, [property]: value }));
  };

  const temperamentsHandler = (event) => {
    const temperamentChoice = event.target.value;
    if (count <= 10) {
      setDog({
        ...dog,
        temperaments: [...dog.temperaments, temperamentChoice],
      });
      setchosenTemperaments(
        validationTemperaments({
          ...dog,
          temperaments: [...dog.temperaments, temperamentChoice],
        })
      );
      setCount(count + 1); // ONLY 10 TEMPERAMENTS ALLOW
    }
    setButtonDisabled(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(postDog(dog));
    setDog({
      reference_image_id: "",
      life_span: "",
      name: "",
      weightMin: "",
      weightMax: "",
      heightMin: "",
      heightMax: "",
      temperaments: [],
  })}

  const reset = () => {
    setDog({
      reference_image_id: "",
      life_span: "",
      name: "",
      weightMin: "",
      weightMax: "",
      heightMin: "",
      heightMax: "",
      temperaments: [],
  })
  }

  return (
    <section className={css.background}>
      <form className={css.formContainer} onSubmit={submitForm} action="">
        <div className={css.formContent}>
          <div className={css.title}>
            <label htmlFor="">
              {" "}
              Nombre de raza
              <div>
                <input
                  onChange={formHandler}
                  type="text"
                  name="name"
                  value={dog.name}
                  placeholder="Ejemplo: Raza Retriever"
                  required
                />
              </div>
              {errors.name ? <p>{errors.name}</p> : null}
            </label>
          </div>

          {!errors.name && (
            <div className={css.altYPesoContainer}>
              <div className={css.alturaContainer}>
                <label htmlFor="">
                  {" "}
                  Altura Min (cm):
                  <input
                    onChange={formHandler}
                    type="number"
                    name="heightMin"
                    placeholder="0"
                    value={dog.heightMin}
                    required
                  />
                  {errors.heightMin && <p>{errors.heightMin}</p>}
                </label>
                <label htmlFor="">
                  {" "}
                  Altura Max (cm):
                  <input
                    onChange={formHandler}
                    type="number"
                    name="heightMax"
                    placeholder="0"
                    value={dog.heightMax}
                    required
                  />
                  {errors.heightMax && <p>{errors.heightMax}</p>}
                </label>
              </div>
              <div className={css.pesoContainer}>
                <label htmlFor="">
                  {" "}
                  Peso Min:
                  <input
                    onChange={formHandler}
                    type="number"
                    name="weightMin"
                    placeholder="1"
                    value={dog.weightMin}
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
                    value={dog.weightMax}
                    required
                  />
                  {errors.weightMax ? <p>{errors.weightMax}</p> : null}
                </label>
              </div>
            </div>
          )}

          {!errors.name &&
            !errors.heightMin &&
            !errors.heightMax &&
            !errors.weightMin &&
            !errors.weightMax && (
              <div className={css.promedioContainer}>
                <label htmlFor="">
                  Promedio de vida
                  <div>
                    <input
                      onChange={formHandler}
                      type="text"
                      name="life_span"
                      placeholder="Ejemplo: 11 - 13"
                      value={dog.life_span}
                      required
                    />
                  </div>
                  {errors.life_span ? <p>{errors.life_span}</p> : null}
                </label>
              </div>
            )}

          {!errors.name &&
            !errors.heightMin &&
            !errors.heightMax &&
            !errors.weightMin &&
            !errors.weightMax &&
            !errors.life_span && (
              <div className={css.promedioContainer}>
                <label htmlFor="">
                  {" "}
                  Ingrese la url con la imagen del perro
                  <input
                    onChange={formHandler}
                    type="url"
                    name="reference_image_id"
                    placeholder="https://www.ejemplo.com/"
                    value={dog.reference_image_id}
                    required
                  />
                  {errors.reference_image_id ? (
                    <p>{errors.reference_image_id}</p>
                  ) : null}
                </label>
              </div>
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

          {chosenTemperaments && dog.temperaments.length != 0 && (
            <div className={css.temperamentChoice}>
              Tus elecciones de temperamentos son las siguientes:
              <div className={css.temperamentsPosition}>
                {chosenTemperaments.map((e, index) => (
                  <span key={index}> {e} </span>
                ))}
              </div>
              <div>
                {count == 11 && (
                  <p> Sólo se permiten seleccionar 10 temperamentos por raza</p>
                )}
              </div>
            </div>
          )}
          <div className={css.buttonContainer}>
            <button type="button" onClick={reset}> Limpiar campos </button>
            <button type="submit" disabled={buttonDisabled}>Enviar formulario</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Create;
