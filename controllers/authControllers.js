
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

    const registeredUser = async (req, res, next) => {
        try {
            const { email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json({ 
                    message: "Email and password are required",
                });
        }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists",
                });
            }
            const newUser =  await User.create({
                email,
                password,
            });
            res.status(201).json({
                message: "User registered successfully",
            });
        } catch (error){
            console.error("Error registering user:", error);
            res.status(500).json({
                message: "Something went wrong while registering the user",
            });
        }
    };
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = jwt.sign(
            { userid: user._id, role: user.role },
             process.env.JWT_SECRET,
              { expiresIn: '1h' });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 360000,

        });
        res.status(200).json({
            message: "User Logged in Successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            token: token,
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            message: "Something went wrong while logging in the user",
        });
    }
};
const logoutUser = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully",
    });
};
module.exports = {
    registeredUser,
    loginUser,
    logoutUser,
};