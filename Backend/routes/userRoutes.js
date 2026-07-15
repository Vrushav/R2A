console.log("✅ userRoutes.js loaded");
const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");

const {
    createProfile,
    getProfile,
    updateProfile
} = require("../controllers/userController");

// Create profile
router.post("/profile", authenticateUser, createProfile);

// Get logged-in user's profile
router.get("/me", authenticateUser, getProfile);

// Update profile
router.put("/me", authenticateUser, updateProfile);

router.get("/hello", (req, res) => {
    res.json({ message: "Hello from user routes" });
});

module.exports = router;
