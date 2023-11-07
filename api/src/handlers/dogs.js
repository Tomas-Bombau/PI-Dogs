const Router = require("express");
const { getAllDogs } = require("../controllers/getAllDogs");
const postDogs = require("../controllers/postDogs");
const getDogById = require("../controllers/getDogById");
const allDogsByName = require("../controllers/getDogByname");
const deleteDog = require("../controllers/deleteDog");

const dogs = Router();

// Getting all dogs
dogs.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const getDogByName = await allDogsByName(name);
      res.status(200).json(getDogByName);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const dogs = await getAllDogs();
      res.status(200).json(dogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Getting dog by IDs
dogs.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  try {
    const dogById = await getDogById(idRaza);
    dogById
      ? res.status(200).json(dogById)
      : res
          .status(404)
          .json({
            message: "The dog doesn't existe. The ID you provided doesn't match our records"
  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Getting posting dog
dogs.post("/", async (req, res) => {
  const {
    name,
    life_span,
    weightMin,
    weightMax,
    heightMin,
    heightMax,
    reference_image_id,
    createdInDb,
    temperaments,
  } = req.body;
  try {
    await postDogs(
      reference_image_id,
      name,
      life_span,
      weightMin,
      weightMax,
      heightMin,
      heightMax,
      createdInDb,
      temperaments
    );
    res.status(200).send("La raza se ha creado satisfactoriamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

dogs.delete("/delete", async (req, res) => {
  const {id} = req.body
  try {
    await deleteDog(id)
    res.status(200).send("La raza se ha eliminado satisfactoriamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = dogs;
