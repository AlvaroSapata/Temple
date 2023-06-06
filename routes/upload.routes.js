// in routes/upload.routes.js

const router = require("express").Router();

const imageUploader = require("../middlewares/cloudinaryImg.config");
const videoUploader = require("../middlewares/cloudinary.config");

// POST "/api/upload/image"
router.post("/image", imageUploader.single("image"), (req, res, next) => {
  // console.log("file is: ", req.file);

  if (!req.file) {
    next("No image uploaded!");
    return;
  }

  // get the URL of the uploaded file and send it as a response.
  // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ imageUrl: req.file.path });
});

// POST "/api/upload/video"
router.post("/video", videoUploader.single("video"), (req, res, next) => {
    // console.log("file is: ", req.file);
  
    if (!req.file) {
      next("No file uploaded!");
      return;
    }
  
    // get the URL of the uploaded file and send it as a response.
    // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
    res.json({ videoUrl: req.file.path });
  });
module.exports = router;