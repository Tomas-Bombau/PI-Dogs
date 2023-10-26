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
      const dogDetail = {
        id: dogData.id,
        reference_image_id: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`,
        name: dogData.name,
        life_span: dogData.life_span,
        weight: dogData.weight,
        height: dogData.height,
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
    return allDogsDB;
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

module.exports = getAllDogs
