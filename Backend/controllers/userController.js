const User = require("../models/User");
const userService = require("../services/userService");

// CREATE PROFILE
const createProfile = async (req, res) => {
    try {

        const updatedUser = await userService.createProfile(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile created successfully.",
            data: updatedUser
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

// GET PROFILE
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json({
            success: true,
            user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// UPDATE PROFILE
const updateProfile = async (req, res) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true }
        ).select("-password");

        res.json({
            success: true,
            message: "Profile updated.",
            user: updatedUser
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
    createProfile,
    getProfile,
    updateProfile
};