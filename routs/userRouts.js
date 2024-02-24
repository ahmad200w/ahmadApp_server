const express = require("express");
const { Login, Register, findeAllUser } = require("../Controllers/useController");
const userRouts = express.Router();

userRouts.post("/Login", Login);
userRouts.post("/Register", Register);
userRouts.get("/alleUsers",findeAllUser)

module.exports = userRouts;
