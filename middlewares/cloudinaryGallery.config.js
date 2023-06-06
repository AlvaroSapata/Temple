const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      allowed_formats: ["jpg", "png"],
      folder: "my-app", // El nombre de la carpeta donde se almacenarán las imágenes en Cloudinary
      resource_type: "raw",
    },
  });
  
  const multipleImageUploader = multer({ storage }).array("images", 10); // Puedes ajustar el límite de imágenes permitidas (en este caso, 10)
  
  module.exports = multipleImageUploader;