require("dotenv").config();
const axios = require("axios");
const { Dog } = require("../db");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

const getDogById = async (idRaza) => {
  const regexValidationUUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  // Busco en Base de Datos
  if (regexValidationUUID.test(idRaza)) {
    const dogById = await Dog.findOne({
      where: { id: idRaza },
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dogById;
  }

  //Busco en la API y le agrego los temperamentos
  const getAllDogsApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const findDogById = await getAllDogsApi.data.find((dog) => dog.id == idRaza);

  const dogById = {
    id: findDogById.id,
    reference_image_id: `https://cdn2.thedogapi.com/images/${findDogById.reference_image_id}.jpg`,
    name: findDogById.name,
    life_span: findDogById.life_span,
    weight: findDogById.weight,
    height: findDogById.height,
    temperament: findDogById.temperament,
  };
  return dogById;
};

module.exports = getDogById;
