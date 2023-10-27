require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

const getAllDogsApi = async () => {
  try {
    const getAllDogsApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    const allDogsApi = await getAllDogsApi.data.map((dogData) => {
      const weight = dogData.weight.metric.split(" - ");
      const height = dogData.height.metric.split(" - ");
      const temperaments = dogData.temperament;
      const arrayOfTemperaments = temperaments ? temperaments.split(", ") : [];

      const dogDetail = {
        id: dogData.id,
        reference_image_id: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`,
        name: dogData.name,
        life_span: dogData.life_span,
        weightMin: weight[0],
        weightMax: weight[1],
        heightMin: height[0],
        heightMax: height[1],
        temperaments: arrayOfTemperaments,
      };

      return dogDetail;
    });
    return allDogsApi;
  } catch (error) {
    console.error("Error fetching all dogs from API");
    return []; // Devuelve un arreglo vacío en caso de error
  }
};

const getAllDogsDB = async () => {
  try {
    const allDogsDB = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const arrangeDogsDB = allDogsDB.map((dog) => {
      const arrangeTemperaments = dog.temperaments.map((temp) => temp.name); //Saco unicamente el valor de la propiedad del objeto
      return {
        ...dog.get(), //En sequelize se utiliza este metodo que trae todas las propiedades y valores de una instancia del modelo
        temperaments: arrangeTemperaments, // Reemplazo el objeto entero que se encontraba en esta propiedad, por el valor de esa propiedad
      };
    });
    return arrangeDogsDB;
  } catch (error) {
    console.error("Error fetching all dogs from database");
    return []; // Devuelve un arreglo vacío en caso de error
  }
};

const getAllDogs = async () => {
  const dogsAPI = await getAllDogsApi();
  const dogsDB = await getAllDogsDB();
  const getAllDogs = [...dogsAPI, ...dogsDB];
  return getAllDogs;
};

module.exports = { getAllDogs, getAllDogsApi };
