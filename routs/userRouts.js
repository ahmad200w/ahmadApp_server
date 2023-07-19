const express = require("express");
const {
  Login,
  Register,
  infoTheAddress,
  saveTheDate,
  deletById,
  upDateTheData,
} = require("../Controllers/useController");


const userRouts = express.Router();
userRouts.get("/Login", Login);
userRouts.post("/Register", Register);
userRouts.post("/addrese", infoTheAddress);
userRouts.post("/category", saveTheDate);
userRouts.delete("/:id",deletById)
userRouts.put("/:id/change",upDateTheData)

module.exports = userRouts;
