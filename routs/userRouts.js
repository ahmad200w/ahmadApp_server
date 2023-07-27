const express = require("express");
const {
  Login,
  Register,
  infoTheAddress,
  saveTheDate,
  deletById,
  upDateTheData,
  findProduct,
} = require("../Controllers/useController");


const userRouts = express.Router();
userRouts.post("/Login", Login);
userRouts.post("/Register", Register);
userRouts.post("/addrese", infoTheAddress);
userRouts.post("/category", saveTheDate);
userRouts.delete("/:id!",deletById)
userRouts.put("/change",upDateTheData)
userRouts.get("/findC",findProduct)

module.exports = userRouts;
