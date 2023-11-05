const { Dog, Temperament } = require("../db.js");
const {getAllDogs} = require('./getAllDogs.js')

const postDogs = async (
  reference_image_id,
  name,
  life_span,
  weightMin, 
  weightMax, 
  heightMin, 
  heightMax,
  createdInDb,
  temperaments
) => {
  if(!name || !life_span || !weightMin || !weightMax || !heightMin || !heightMax || !life_span || !reference_image_id || !temperaments) throw Error ('Validation error: incomplete data provided')
  const allDogs = await getAllDogs()
  const findByName = allDogs.find(dog => dog.name == name)
  if (findByName) throw Error ('el nombre de esa raza ya existe') // Evito repeticiones a la hora de crear nuevas razas de perro

  const newDog = await Dog.create({
    reference_image_id,
    name,
    life_span,
    weightMin, 
    weightMax, 
    heightMin, 
    heightMax,
    createdInDb,
  });

  let searchTemperament = await Temperament.findAll({
    where: { name: temperaments },
  });

  newDog.addTemperament(searchTemperament);

  return newDog;
};

module.exports = postDogs;
