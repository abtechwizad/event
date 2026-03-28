const bcrypt = require("bcrypt");
const User = require("../../../db_modules/userModel"); // path to your user model
const jwt = require("jsonwebtoken");
require("dotenv").config();
const registerUser = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        // -----------------------------
        // Basic validation
        // -----------------------------
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Allowed roles from frontend
        const allowedRoles = ["exhibitor", "attendee"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role selected!"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered!"
            });
        }

        // -----------------------------
        // Hash password
        // -----------------------------
        const hashedPassword = await bcrypt.hash(password, 10);

        // -----------------------------
        // Create user
        // -----------------------------
        const createUser = await User.create({
            name,
            email,
            role,
            password: hashedPassword
        });
        let payload = {
                id: createUser._id,
                name: createUser.name,
                email: createUser.email,
                role: createUser.role
            }
        const token = jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: "7d" // token valid for 7 days
        });

        // -----------------------------
        // Set token as HttpOnly cookie
        // -----------------------------
        res.cookie("user", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only HTTPS in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });


        // -----------------------------
        // Success response
        // -----------------------------
        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
        });

    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
};


const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        // -----------------------------
        // Check if user exists
        // -----------------------------
        let userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "User not found!"
            });
        }

        // -----------------------------
        // Compare password
        // -----------------------------
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password!"
            });
        }

        // -----------------------------
        // Create JWT payload
        // -----------------------------
        let payload = {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role
        };

        // -----------------------------
        // Sign token
        // -----------------------------
        console.log(process.env.SECRETKEY)
        const token = jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: "7d" // token valid for 7 days
        });

        // -----------------------------
        // Set token as HttpOnly cookie
        // -----------------------------
        res.cookie("user", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only HTTPS in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // -----------------------------
        // Send response
        // -----------------------------
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            data: {
                id: userData._id,
                name: userData.name,
                email: userData.email,
                role: userData.role
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
};

module.exports = { registerUser,loginUser };