const Router = require("express");
const { getAllDogs } = require("../controllers/getAllDogs");
const postDogs = require("../controllers/postDogs");
const getDogById = require("../controllers/getDogById");
const allDogsByName = require("../controllers/getDogByname");

const dogs = Router();

// Getting all dogs
dogs.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const getDogByName = await allDogsByName(name)
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
          .send(
            "The dog doesn't existe. The ID you provided doesn't match our records"
          );
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error the servidor interno
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
    res.status(200).send('Dog created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = dogs;
