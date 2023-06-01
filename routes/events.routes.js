 const router = require("express").Router();

 const Event = require("../models/Event.model.js")

 //GET /api/events => enviar al front end la lista de todos los eventos

 router.get("/", async (req, res, next) => {
  try {
    const response = await Event.find();
    res.json("prueba");
  } catch (err) {
    next(err);
 }
 });


 module.exports = router;