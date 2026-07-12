const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// ========================
// REGISTER USER
// ========================
const signup = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            role = "patient",
            phone = ""
        } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided."
            });
        }

        // Existing user?
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Encrypt Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone
        });

        res.status(201).json({
            success: true,
            message: "Registration successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Generate JWT
        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            success: true,

            message: "Login successful.",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {
    signup,
    login
};