// Création de Express
const express = require("express");
//Appel de Express
const router = express.Router();

// On importe les controllers user
const userControllers = require("../controllers/user");

// Route pour envoyez les informations de connection d'un utilisateur
router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);

// On exporte vers "app.js"
module.exports = router;
