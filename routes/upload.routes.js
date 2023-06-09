

const router = require("express").Router();

const imageUploader = require("../middlewares/cloudinaryImg.config");
const videoUploader = require("../middlewares/cloudinary.config");
const multipleImageUploader = require("../middlewares/cloudinaryGallery.config");

// POST "/api/upload/image"
router.post("/image", imageUploader.single("image"), (req, res, next) => {
  
  if (!req.file) {
    next("No image uploaded!");
    return;
  }

  
  res.json({ imageUrl: req.file.path });
});

// POST "/api/upload/video"
router.post("/video", videoUploader.single("video"), (req, res, next) => {
  if (!req.file) {
    next("No file uploaded!");
    return;
  }

  res.json({ videoUrl: req.file.path });
});

router.post("/multiple-images", multipleImageUploader, (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    next("No images uploaded!");
    return;
  }

  const imageUrls = req.files.map((file) => file.path);
  res.json({ imageUrls });
});


module.exports = router;
