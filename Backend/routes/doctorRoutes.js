const express = require("express");
const router = express.Router();

console.log("✅ doctorRoutes.js loaded");

router.get("/test", (req, res) => {
    res.send("Doctor routes working");
});

const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    updateDoctorAvailability
} = require("../controllers/doctorController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Create Doctor (Admin only)
router.post(
    "/",
    authenticateUser,
    authorizeRoles("admin"),
    createDoctor
);

// Get All Doctors
router.get(
    "/",
    authenticateUser,
    getAllDoctors
);

// Get Doctor By ID
router.get(
    "/:id",
    authenticateUser,
    getDoctorById
);

// Update Doctor
router.put(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    updateDoctor
);

router.patch(
    "/:id/availability",
    authenticateUser,
    authorizeRoles("admin"),
    updateDoctorAvailability
);

module.exports = router;