// Création de Express
const express = require("express");
//Appel de Express
const router = express.Router();

// On importe les controllers auth
const auth = require("../middleware/auth");
//On importe les controllers multer
const multer = require("../middleware/multer");

// On importe les controllers sauce
const sauceControllers = require("../controllers/sauce");

// Route pour allez chercher toutes les sauces
router.get("/", auth, sauceControllers.getAllSauce);
// Route pour envoyez une sauce créer par l'utilisateur
router.post("/", auth, multer, sauceControllers.createSauce);
// Route pour allez chercher une sauce par son id
router.get("/:id", auth, sauceControllers.getOneSauce);
// Route pour modifier une sauce par son id
router.put("/:id", auth, multer, sauceControllers.modifySauce);
// Route pour supprimer une sauce par son id
router.delete("/:id", auth, sauceControllers.deleteSauce);
// Route pour envoyez un like ou un dislike par l'utilisateur
router.post("/:id/like", auth, sauceControllers.likeOrDislike);

// On exporte vers "app.js"
module.exports = router;
