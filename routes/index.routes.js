const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));

router.use("/djs", require("./djs.routes"));
router.use("/events", require("./events.routes"));

router.use("/locations", require("./locations.routes"));

router.use("/products", require("./products.routes"));

module.exports = router;
