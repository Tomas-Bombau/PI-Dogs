const { Dog } = require("../db.js");

const deleteDog = async (id) => {
  const deletedDog = await Dog.destroy({
    where: {
      id: id,
    },
  });

  return deletedDog;
};

module.exports = deleteDog;
