// On importe Express
const express = require("express");
// On importe Mongoose
const mongoose = require("mongoose");
// On importe path pour donner accès au system de ficher "images"
const path = require("path");

// On importe les modules pour la sécurité
const helmet = require("helmet");
const nocache = require("nocache");
require("dotenv").config();
const session = require("cookie-session");

// On importe les controllers user & sauce
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

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

app.use(express.json());

// Sécurité
app.use(helmet());
app.use(nocache());
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 heure
app.use(
  session({
    name: "session",
    keys: ["key1", "key2"],
    cookie: {
      secure: true, // le cookie doit être envoyé uniquement via HTTPS
      httpOnly: true, // le cookie doit uniquement être envoyé via HTTP(S) et n'est pas mis à la disposition du client JavaScript
      domain: "http://localhost:3000", // le domaine du cookie
      expires: expiryDate, // la date d'expiration du cookie
    },
  })
);

// On appelle le middleware qui permet de télecharger des fichers dans la base de données
app.use("/images", express.static(path.join(__dirname, "images")));

// On appelle la route User
app.use("/api/auth", userRoutes);
// On appelle la route Sauce
app.use("/api/sauces", sauceRoutes);

// On exporte pour server.js
module.exports = app;
