const User = require("../models/User");

// GET MY PROFILE

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

            {
                new: true
            }

        ).select("-password");

        res.json({

            success: true,

            message: "Profile updated.",

            user: updatedUser

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {

    getProfile,

    updateProfile

};