const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://maximusgen:Drakaxx92@test.4wl0j.mongodb.net/sauce?retryWrites=true&w=1",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");
const user = require("./models/user");

const app = express();

app.use(bodyParser.json());

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

app.use("/api/auth/", userRoutes);

module.exports = app;
