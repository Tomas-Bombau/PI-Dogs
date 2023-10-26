const Router = require("express");
const getAllDogs = require("../controllers/getAllDogs");
const postDogs = require("../controllers/postDogs");
const getDogById = require("../controllers/getDogById");
const dogs = Router();

// Getting all dogs
dogs.get("/", async (req, res) => {
  try {
    const dogs = await getAllDogs();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Getting dog by name
dogs.get("/name", (req, res) => {
  const { name } = req.query;
  try {
    res.status(200).send(`Funciona ruta GET ${name} dogs`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Getting dog by IDs
dogs.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  try {
    const dogById = await getDogById(idRaza);
    dogById
    ? res.status(200).json(dogById)
    : res.status(404).json("The dog doesn't existe. The ID you provided doesn't match our records");
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error the servidor interno
  }
});

// Getting posting dog
dogs.post('/', async (req, res) =>{
    const {name, life_span, weight, height, reference_image_id, createdInDb, temperament} = req.body
    try {
      const newDog = await postDogs(reference_image_id, name, life_span, weight, height,createdInDb, temperament)
      res.status(200).send(newDog)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
})

module.exports = dogs;
