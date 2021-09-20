// On importe Mongoose
const mongoose = require("mongoose");

// On impote Unique Validator pour valider un seul email
const uniqueValidator = require("mongoose-unique-validator");

//On crée un model User
const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

userSchema.plugin(uniqueValidator);

// On exporte le schéma "userSchema" sous forme de model
module.exports = mongoose.model("User", userSchema);
