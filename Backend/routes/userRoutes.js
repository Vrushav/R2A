console.log("✅ userRoutes.js loaded");
const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");

const {
    createProfile,
    getProfile,
    updateProfile
} = require("../controllers/userController");

const {
    validateProfile,
    handleValidation
} = require("../validators/userValidator");

// Create profile
router.post("/profile", authenticateUser, validateProfile, handleValidation, createProfile);

// Get logged-in user's profile
router.get("/me", authenticateUser, getProfile);

// Update profile
router.put("/me", authenticateUser,validateProfile, handleValidation, updateProfile);

router.get("/hello", (req, res) => {
    res.json({ message: "Hello from user routes" });
});

module.exports = router;
