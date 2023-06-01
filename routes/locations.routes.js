const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const Location = require("../models/Location.model");

// Rutas CRUD de

// GET "/api/locations" => Envia al FE todas las Locations
router.get("/", async (req, res, next) => {
  try {
    const response = await Location.find();
    console.log(response);
    res.json(`Lista Locations encontrada ${response}`);
  } catch (error) {
    next(error);
  }
});

// POST "/api/locations" => Recibe data del FE y crea una nueva Location en la DB
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.payload);
    // Destructuramos el req.body
    const { name, image, description, adress, createdBy } = req.body;
    const response = await Location.create({
      name,
      image,
      description,
      adress,
      createdBy: req.payload._id,
    });
    console.log(response);
    res.json(`Location creada ${response}`);
  } catch (error) {
    next(error);
  }
});

// GET "/api/locations/:locationId" => Envia al FE una Location por su ID
router.get("/:locationId", async (req, res, next) => {
  // Destructuramos el req.params
  const { locationId } = req.params;
  try {
    const response = await Location.findById(locationId);
    console.log(response);
    res.json(`Location encontrada ${response}`);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/locations/:locationId" => Borra una location por su ID
router.delete("/:locationId", async (req, res, next) => {
  // Destructuramos el req.params
  const { locationId } = req.params;
  try {
    const response = await Location.findByIdAndDelete(locationId);
    res.json(`Location borrada ${response}`);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/locations/:locationId" => Edita una location por su ID
router.put("/:locationId", async (req, res, next) => {
  // Destructuramos el req.params y el req.body
  const { locationId } = req.params;
  // Destructuramos el req.body
  const { name, image, description, adress, createdBy } = req.body;
  try {
    const response = await Location.findByIdAndUpdate(locationId, {
      name,
      image,
      description,
      adress,
    });
    console.log(response);
    res.json(`Location editada ${response}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
