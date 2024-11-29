const mongoose = require("mongoose");
const { applyTimestamps } = require("./Task");
const schema=mongoose.schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
 refreshToken: String
})


module.exports = mongoose.model("User", UserSchema);
