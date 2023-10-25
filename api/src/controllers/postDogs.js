const { Dog, Temperament } = require("../db.js");

const postDogs = async (
  name,
  life_span,
  weight,
  height,
  reference_image_id,
  temperament
) => {
  const newDog = await Dog.create({
    name,
    life_span,
    weight,
    height,
    reference_image_id,
  });

  let searchTemperament = await Temperament.findAll({
    where: {name: temperament}
  });

  newDog.addTemperaments(searchTemperament);

  return newDog;
};

module.exports = postDogs;
