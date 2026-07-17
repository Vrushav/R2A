const express = require("express");
const router = express.Router();

const {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} = require("../controllers/appointmentController");

// Create Appointment
router.post("/", createAppointment);

// Get All Appointments
router.get("/", getAllAppointments);

// Get Appointment By ID
router.get("/:id", getAppointmentById);

// Update Appointment
router.put("/:id", updateAppointment);

// Delete Appointment
router.delete("/:id", deleteAppointment);

module.exports = router;