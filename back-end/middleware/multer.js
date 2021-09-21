// On importe Multer
const multer = require("multer");

// Extension de fichers et dictionnaires des types MIME
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Création d'un objet pour multer afin d'enregistrer les images et les renommer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// On exporte Multer
module.exports = multer({ storage: storage }).single("image");
