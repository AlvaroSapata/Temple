const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdminBack = require("../middlewares/isAdminBack");
const Dj = require("../models/Dj.model");

//! CLOUDINARY
// Rutas CRUD de Products

// GET "/api/djs" => Envia al FE todas los Djs
router.get("/", async (req, res, next) => {
  try {
    const response = await Dj.find();
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/djs" => Recibe data del FE y crea un nuevo Dj en la DB
router.post("/", isAuthenticated, isAdminBack, async (req, res, next) => {
  try {
    // Destructuramos el req.body
    const { name, image, createdBy } = req.body;
    const response = await Dj.create({
      name,
      //! CLOUDINARY
      image,
      createdBy: req.payload._id,
    });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/djs/:djId" => Borra un Dj por su ID
router.delete("/:djId", isAdminBack, async (req, res, next) => {
  // Destructuramos el req.params
  const { djId } = req.params;
  try {
    const response = await Dj.findByIdAndDelete(djId);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
