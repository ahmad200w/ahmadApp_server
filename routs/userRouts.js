const express = require("express");

const Login = require("../Controllers/loginController");
const Register = require("../Controllers/useRegister");
const usersOrder = require("../Controllers/showOrders");
const sendOrder = require("../Controllers/sendTheOrder");

const userRouts = express.Router();
userRouts.post("/sendOrder", sendOrder);
userRouts.post("/Login",Login);
userRouts.post("/Register", Register);
userRouts.get("/order",usersOrder)

module.exports = userRouts;
