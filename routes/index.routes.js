const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));

router.use("/djs", require("./djs.routes"));

router.use("/events", require("./events.routes"));

router.use("/locations", require("./locations.routes"));

router.use("/products", require("./products.routes"));

router.use("/upload", require("./upload.routes"));

/* router.use("/map", require("./map.routes")) */

module.exports = router;
