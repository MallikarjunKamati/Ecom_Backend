const express = require("express");
const { registeredUser, loginUser, logoutUser, verifyUser } = require("../controllers/authControllers");

const authRoutes = express.Router();

authRoutes.post("/register", registeredUser);

authRoutes.post("/login", loginUser);

authRoutes.post("/logout", logoutUser);

authRoutes.get("/verify", verifyUser);

module.exports = authRoutes;