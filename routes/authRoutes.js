const express = require("express");
const { registeredUser, loginUser, logoutUser } = require("../controllers/authControllers");

const authRoutes = express.Router();

authRoutes.post("/register", registeredUser);

authRoutes.post("/login", loginUser);

authRoutes.post("/logout", logoutUser);


module.exports = authRoutes;