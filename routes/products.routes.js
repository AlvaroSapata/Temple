const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdminBack = require("../middlewares/isAdminBack");

const Product = require("../models/Product.model");

//! CLOUDINARY
// Rutas CRUD de Products

// GET "/api/products" => Envia al FE todas los productos
router.get("/", async (req, res, next) => {
  try {
    const response = await Product.find();
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/products" => Recibe data del FE y crea un nuevo product en la DB
router.post("/", isAuthenticated, isAdminBack, async (req, res, next) => {
  try {
    // Destructuramos el req.body
    const { name, price, description, image, createdBy } = req.body;
    const response = await Product.create({
      name,
      price,
      description,
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

// DELETE "/api/products/:productId" => Borra un producto por su ID
router.delete("/:productId", isAuthenticated,isAdminBack, async (req, res, next) => {
  // Destructuramos el req.params
  const { productId } = req.params;
  try {
    const response = await Product.findByIdAndDelete(productId);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/products/:productId" => Actualiza un producto por su ID
router.put("/:productId",isAuthenticated, isAdminBack, async (req, res, next) => {
  // Destructuramos el req.params
  const { productId } = req.params;
  // Destructuramos el req.body
  const { name, price, description, image, createdBy } = req.body;
  try {
    const response = await Product.findByIdAndUpdate(productId, {
      name,
      price,
      description,
      //! CLOUDINARY
      image,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
