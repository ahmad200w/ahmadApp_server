const mongoose = require("mongoose");

const userM = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 orders: [{
    quantity: { type: Number, required: true },
    phoneType: { type: String, required: true },
    total: { type: Number, required: true }
  }],
total :{type :Number ,default:0}
});

const userModule = mongoose.model("User", userM);

module.exports = userModule;
