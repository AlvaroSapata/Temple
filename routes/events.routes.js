const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated.js");
const Event = require("../models/Event.model.js");

//GET /api/events => enviar al front end la lista de todos los eventos
router.get("/", async (req, res, next) => {
  try {
    const response = await Event.find();
    console.log(response);
    res.json(`Lista Eventos encontrada ${response}`);
  } catch (err) {
    next(err);
  }
});

// POST /api/events => recibir del fronted los detalles de un todo y crearlo en la BD
router.post("/", isAuthenticated, async (req, res, next) => {
  const {
    image,
    title,
    date,
    location,
    gallery,
    afterMovie,
    djs,
    joinPeople,
    createdBy,
  } = req.body;

  try {
    console.log(req.payload);
    console.log(req.body);
    console.log(req.params);
    await Event.create({
      title,
      date,
      location, // body ??
      gallery,
      afterMovie,
      djs, // body ??
      joinPeople, // []
      createdBy: req.payload._id, // payload
      image,
    });

    res.json("documento creado");
  } catch (error) {
    next(error);
  }
});

//GET /api/events/:id => enviar al fronted los detalles de un evento
router.get("/:eventId", async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const response = await Event.findById(eventId);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/events/:events => eliminar un evento
router.delete("/:eventId", async (req, res, next) => {
  const { eventId } = req.params;
  try {
    await Event.findByIdAndDelete(eventId);
    res.json("documento eliminado");
  } catch (err) {
    next(err);
  }
});

//PUT /api/events/:eventId => modificar un evento
router.put("/:eventId", isAuthenticated, async (req, res, next) => {
  const { eventId } = req.params;
  const {
    title,
    date,
    location,
    gallery,
    afterMovie,
    djs,
    joinPeople,
    createdBy,
    image,
  } = req.body;
  try {
    console.log(req.payload);
    await Event.findByIdAndUpdate(eventId, {
      title,
      date,
      location,
      gallery,
      afterMovie,
      djs,
      joinPeople,
      createdBy: req.payload._id,
      image,
    });
    res.json("documento modificado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
