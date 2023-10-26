const { Dog, Temperament } = require("../db.js");
const getAllDogs = require('./getAllDogs.js')

const postDogs = async (
  reference_image_id,
  name,
  life_span,
  weight,
  height,
  createdInDb,
  temperament
) => {
  const allDogs = await getAllDogs()
  const findByName = allDogs.find(dog => dog.name == name)
  if(!name || !life_span || !weight || !height || !life_span || !reference_image_id || !temperament) throw Error ('Validation error: incomplete data provided')
  if (findByName) throw Error ('The dog already exists') // Evito repeticiones a la hora de crear nuuevas razas de perro

  const newDog = await Dog.create({
    reference_image_id,
    name,
    life_span,
    weight,
    height,
    createdInDb,
  });

  let searchTemperament = await Temperament.findAll({
    where: { name: temperament },
  });

  newDog.addTemperaments(searchTemperament);

  return newDog;
};

module.exports = postDogs;
