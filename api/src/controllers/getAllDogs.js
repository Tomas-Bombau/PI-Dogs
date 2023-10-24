require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db.js')

const getAllDogs = async () => {
  const getAllDogsApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const allDogsData = getAllDogsApi.data;

  const dogsDetail = await allDogsData.map((dogData) => {
      const dogDetail = {
        id: dogData.id,
        name: dogData.name,
        life_span: dogData.life_span,
        weight: dogData.weight,
        height: dogData.height,
        reference_image_id: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`,
      };
      return dogDetail;
  });

  const getAllDogsDB = await Dog.findAll({
    include:{
        model: Temperament,
        attributes: ['name'],
        through: [],
    }
  })

  const getAllDogs = [...dogsDetail, ...getAllDogsDB]

  return getAllDogs
};

module.exports = getAllDogs;
