require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { getAllDogsApi } = require("./getAllDogs");

const getDogById = async (idRaza) => {
  const regexValidationUUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  // Busco en Base de Datos
  if (regexValidationUUID.test(idRaza)) {
    const getDogById = await Dog.findOne({
      where: { id: idRaza },
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const arrangeTemperaments = getDogById.temperaments.map((temp) => temp.name); 
    const dogById = {...getDogById.get(), temperaments: arrangeTemperaments}
    return dogById
  }

  //Busco en la API y le agrego los temperamentos
  const getAllDogsFromApi = await getAllDogsApi()
  const dogById = getAllDogsFromApi.find((dog) => dog.id == idRaza);
  return dogById;
};

module.exports = getDogById;


