const User = require("../models/User");
const userService = require("../services/userService");
const {
    successResponse,
    errorResponse
} = require("../utils/response");

// CREATE PROFILE
const createProfile = async (req, res) => {
    try {

        const updatedUser = await userService.createProfile(
            req.user.id,
            req.body
        );

        return successResponse(
            res,
            200,
            "Profile created successfully.",
            updatedUser
        ); 
    } catch (error) {

        return errorResponse(
            res,
            400,
            error.message
        );
    }
};

// GET PROFILE
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        return successResponse(
            res,
            200,
            "Profile fetched successfully.",
            user
        );

    } catch (err) {

        console.error(err);

        return errorResponse(
            res,
            500,
            "Internal Server Error"
        );
    }

};

// UPDATE PROFILE
const updateProfile = async (req, res) => {

    try {

        const {
            phone,
            gender,
            age,
            bloodGroup,
            address,
            emergencyContact
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(

            req.user.id,

            {
                phone,
                gender,
                age,
                bloodGroup,
                address,
                emergencyContact
            },

            {
                new: true,
                runValidators: true
            }

        ).select("-password");

        return successResponse(
            res,
            200,
            "Profile updated successfully.",
            updatedUser
        );

    } catch (err) {

        console.error(err);

        return errorResponse(
            res,
            500,
            "Internal Server Error"
        );

    }

};

module.exports = {
    createProfile,
    getProfile,
    updateProfile
};