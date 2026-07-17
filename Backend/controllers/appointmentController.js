const appointmentService = require("../services/appointmentService");

// Create Appointment
const createAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.createAppointment(req.body);

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully.",
            data: appointment
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentService.getAllAppointments();

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Appointment By ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await appointmentService.getAppointmentById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Appointment
const updateAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.updateAppointment(
            req.params.id,
            req.body
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully.",
            data: appointment
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.deleteAppointment(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully."
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};