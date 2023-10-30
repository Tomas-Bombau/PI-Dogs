require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Temperament } = require("../db.js");
const removeDuplicatedValues = require("../functions/functions.js");

const getAllTemperaments = async () => {
  let temperaments = [];
  let concatenatedArray = [];
  let allTemperaments = [];

  const getAllDogs = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const getAllDogsData = getAllDogs.data;

  // Extraigo el STRING de temperamentos y lo transformo en elementos de un mismo ARRAY
  await getAllDogsData.forEach((dogData) => {
    const allTemperaments = dogData.temperament;
    if (allTemperaments) {
      const splitedTemperaments = allTemperaments.split(", ");
      temperaments.push(splitedTemperaments);
    } 
  });

  //Concateno todos los ARRAY en un mismo ARRAY
  concatenatedArray = concatenatedArray.concat(...temperaments);

  // Elimino los duplicados
  allTemperaments = removeDuplicatedValues(concatenatedArray);

  // Ordeno por orden alfabetico
  const orderTemperaments = allTemperaments.sort((a, b) => {
    const nameA = a.trim().toLowerCase(); 
    const nameB = b.trim().toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })

  // Agrego los datos a la Base de Datos
  orderTemperaments.map(
    async (temperament) =>
      await Temperament.findOrCreate({
        where: { name: temperament }
      })
  );

  return allTemperaments;
};

module.exports = getAllTemperaments;
