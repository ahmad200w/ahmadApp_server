const express = require("express");
const {
  Login,
  Register,
  infoTheAddress,
  saveTheDate,
} = require("../Controllers/useController");


const userRouts = express.Router();
userRouts.get("/Login", Login);
userRouts.post("/Register", Register);
userRouts.post("/addrese", infoTheAddress);
userRouts.post("/category", saveTheDate);

module.exports = userRouts;
