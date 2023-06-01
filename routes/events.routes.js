const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated.js");
const Event = require("../models/Event.model.js");

//GET /api/events => enviar al front end la lista de todos los eventos

router.get("/", async (req, res, next) => {
  try {
    const response = await Event.find();
    res.json("prueba");
  } catch (err) {
    next(err);
  }
});

// POST /api/events => recibir del fronted los detalles de un todo y crearlo en la BD

router.post("/",isAuthenticated, async (req, res, next) => {
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
    console.log(req.payload)
    console.log(req.body);
    console.log(req.params);
    await Event.create({
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

    res.json("documento creado");
  } catch (error) {
    next(error);
  }
});

//GET /api/events/:id => enviar al fronted los detalles de un evento

router.get("/:eventsId", async (req, res, next) => {
  const { eventsId } = req.params;
  try {
    const response = await Event.findById(eventsId);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/events/:events => eliminar un evento

router.delete("/:eventsId", async (req, res, next) => {
  const { eventsId } = req.params;
  try {
    await Event.findByIdAndDelete(eventsId);
    res.json("documento eliminado");
  } catch (err) {
    next(err);
  }
});

//PUT /api/events/:eventsId => modificar un evento

router.put("/:eventsId", async (req, res, next) => {
  const { eventsId } = req.params;
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
    await Event.findByIdAndUpdate(eventsId, {
      title,
      date,
      location,
      gallery,
      afterMovie,
      djs,
      joinPeople,
      createdBy,
      image,
    });
    res.json("documento modificado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
