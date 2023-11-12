// Hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components and Functions
import { getTemperaments, postDog } from "../../Redux/Actions/actions";

//Validations
import validation from "./validation";
import validationTemperaments from "./validationTemperaments";

//CSS
import css from "./Create.module.css";
import Errors from "../../Components/Errors/Errors";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const Create = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseError, setResponseError] = useState(null);
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

  const [errorValidation, setErrorValidation] = useState({
    name: " ",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    reference_image_id: "",
  });
  const [chosenTemperaments, setchosenTemperaments] = useState();
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(getTemperaments())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setResponseError(error.message);
      });
  }, []);
  
  const allTemperaments = useSelector((state) => state?.allTemperaments);

  const formHandler = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    setDog({ ...dog, [property]: value });
    setErrorValidation(validation({ ...dog, [property]: value }));
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

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(postDog(dog));
      setResponseMessage(response.payload.data); // Set the response message in the state
      setDog({
        reference_image_id: "",
        life_span: "",
        name: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        temperaments: [],
      });
    } catch (error) {
      setResponseError(error.response.data.error);
    }
  };

  const reset = () => {
    setDog({
      reference_image_id: "",
      life_span: "",
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      temperaments: [],
    });
    setCount(1);
  };

  const handlerDelete = (index) => {
    const filteredTemperaments = chosenTemperaments.filter(
      (temp) => chosenTemperaments.indexOf(temp) !== index
    );
    setDog({ ...dog, temperaments: filteredTemperaments });
    setchosenTemperaments(filteredTemperaments);
    setCount(count - 1);
  };

  if (loading) {
    return <Loading />;
  }

  if (responseError) {
    return <Errors error={responseError} />;
  }

  return (
    <section className={css.background}>
      <form className={css.formContainer} onSubmit={submitForm} action="">
        <div className={css.formContent}>
          <div className={css.title}>
            <label htmlFor="">
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
              {errorValidation.name ? <p>{errorValidation.name}</p> : null}
            </label>
          </div>

          {!errorValidation.name && (
            <div className={css.altYPesoContainer}>
              <div className={css.alturaContainer}>
                <label htmlFor="">
                  Altura Min (cm):
                  <div>
                    <input
                      onChange={formHandler}
                      type="number"
                      name="heightMin"
                      placeholder="0"
                      value={dog.heightMin}
                      required
                    />
                    {errorValidation.heightMin && (
                      <p>{errorValidation.heightMin}</p>
                    )}
                  </div>
                </label>
                <label htmlFor="">
                  Altura Max (cm):
                  <div>
                    <input
                      onChange={formHandler}
                      type="number"
                      name="heightMax"
                      placeholder="0"
                      value={dog.heightMax}
                      required
                    />
                  </div>
                  {errorValidation.heightMax && (
                    <p>{errorValidation.heightMax}</p>
                  )}
                </label>
              </div>
              <div className={css.pesoContainer}>
                <label htmlFor="">
                  Peso Min (kg):
                  <div>
                    <input
                      onChange={formHandler}
                      type="number"
                      name="weightMin"
                      placeholder="0"
                      value={dog.weightMin}
                      required
                    />
                    {errorValidation.weightMin && (
                      <p>{errorValidation.weightMin}</p>
                    )}
                  </div>
                </label>
                <label htmlFor="">
                  Peso Max (kg):
                  <div>
                    <input
                      onChange={formHandler}
                      type="number"
                      name="weightMax"
                      placeholder="0"
                      value={dog.weightMax}
                      required
                    />
                    {errorValidation.weightMax && (
                      <p>{errorValidation.weightMax}</p>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {!errorValidation.name &&
            !errorValidation.heightMin &&
            !errorValidation.heightMax &&
            !errorValidation.weightMin &&
            !errorValidation.weightMax && (
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
                  {errorValidation.life_span ? (
                    <p>{errorValidation.life_span}</p>
                  ) : null}
                </label>
              </div>
            )}

          {!errorValidation.name &&
            !errorValidation.heightMin &&
            !errorValidation.heightMax &&
            !errorValidation.weightMin &&
            !errorValidation.weightMax &&
            !errorValidation.life_span && (
              <div className={css.promedioContainer}>
                <label htmlFor="">
                  Ingrese la url con la imagen del perro
                  <div>
                    <input
                      onChange={formHandler}
                      type="url"
                      name="reference_image_id"
                      placeholder="https://www.ejemplo.com/"
                      value={dog.reference_image_id}
                      required
                    />
                    {errorValidation.reference_image_id ? (
                      <p>{errorValidation.reference_image_id}</p>
                    ) : null}
                  </div>
                </label>
              </div>
            )}

          {!errorValidation.name &&
            !errorValidation.heightMin &&
            !errorValidation.heightMax &&
            !errorValidation.weightMin &&
            !errorValidation.weightMax &&
            !errorValidation.life_span &&
            !errorValidation.reference_image_id && (
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

          {chosenTemperaments && dog.temperaments.length !== 0 && (
            <div className={css.temperamentChoice}>
              Tus elecciones de temperamentos son las siguientes:
              <div className={css.temperamentsPosition}>
                {chosenTemperaments.map((e, index) => (
                  <div key={index} className={css.temperamentsCards}>
                    {" "}
                    {e}{" "}
                    <span
                      onClick={() => handlerDelete(index)}
                      className={css.delete}
                    >
                      x
                    </span>
                  </div> //
                ))}
              </div>
              <div className={css.temperamentsPositionError}>
                {count === 11 && (
                  <p> Sólo se permiten seleccionar 10 temperamentos por raza</p>
                )}
              </div>
            </div>
          )}
          <div className={css.buttonContainer}>
            <button type="button" onClick={reset}>
              {" "}
              Limpiar campos{" "}
            </button>
            <button type="submit" disabled={buttonDisabled}>
              Enviar formulario
            </button>
          </div>
        </div>
        {responseMessage ? (
          <div className={css.success}>
            {" "}
            La raza se ha creado satisfactoriamente{" "}
            <p className={css.botonInicio}>
              <Link to="/home"> Volver al inicio </Link>
            </p>
          </div>
        ) : null}
      </form>
    </section>
  );
};

export default Create;
