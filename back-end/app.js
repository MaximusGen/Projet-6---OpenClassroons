// On importe Express
const express = require("express");
// On importe Mongoose
const mongoose = require("mongoose");
// On importe les controllers user
const userRoutes = require("./routes/user");
// On importe les controllers sauce
const sauceRoutes = require("./routes/sauce");
// On importe path pour donner accès au system de ficher "images"
const path = require("path");
// On importe body-parser
const bodyParser = require("body-parser");

// On importe dotenv pour masquer les information de mongoose connect
require("dotenv").config();

// Connexion à la base de données Mongoose
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// On appelle Express
const app = express();

// On appelle bodyParser pour transformer la requête POST en JSON
app.use(bodyParser.json());

// Pour contourner les erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// On appelle le middleware qui permet de télecharger des fichers dans la base de données
app.use("/images", express.static(path.join(__dirname, "images")));
// On appelle la route User
app.use("/api/auth/", userRoutes);
// On appelle la route Sauce
app.use("/api/sauces", sauceRoutes);

// On exporte pour server.js
module.exports = app;
