require("dotenv").config();
const { getAllDogsApi } = require("./getAllDogs");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

// Search for Dog with name in API
const getDogByNameAPI = async (name) => {
  const nameLow = name.toLowerCase();
  const getAllDogs = await getAllDogsApi();

  const dogsFilter = getAllDogs.filter((dog) =>
    dog.name.trim().toLowerCase().includes(nameLow)
  ); // Transformo las razas de la API a minusculas y luego filtro segun si incluyen o no el name de la query

  const dogsMatches = await dogsFilter.map((dog) => {
    return {
      id: dog.id,
      reference_image_id: dog.reference_image_id,
      name: dog.name,
      life_span: dog.life_span,
      weightMin: dog.weightMin,
      weightMax: dog.weightMax,
      heightMin: dog.heightMin,
      heightMax: dog.heightMax,
      temperaments: dog.temperaments,
    };
  });
  return dogsMatches;
};

// Search for Dog with name in DB
const getDogByNameDB = async (name) => {
  const nameLow = name.toLowerCase();
  const dogsByNameDB = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${nameLow}%`, // Donde el nombre del perro sea igual o parte de un substring de la query de Busqueda. El iLike vuelve al nombre case-insensitive y los % para realizar substring searchs con el parametro
      },
    },
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const arrangeDogsDB = dogsByNameDB.map((dog) => {
    const arrangeTemperaments = dog.temperaments.map((temp) => temp.name);
    return {
      ...dog.get(),
      temperaments: arrangeTemperaments,
    };
  });
  return arrangeDogsDB;
};

const allDogsByName = async (name) => {
  const dogsApi = await getDogByNameAPI(name);
  const dogsDB = await getDogByNameDB(name);
  const dogsByName = [...dogsApi, ...dogsDB];
  return dogsByName;
};

module.exports = allDogsByName;
