const Appointment = require("../models/Appointment");

// Create Appointment
const createAppointment = async (appointmentData) => {
    return await Appointment.create(appointmentData);
};

// Get All Appointments
const getAllAppointments = async () => {
    return await Appointment
        .find()
        .populate("patient", "name email phone")
        .populate("doctor", "name specialization hospital");
};

// Get Appointment By ID
const getAppointmentById = async (appointmentId) => {
    return await Appointment
        .findById(appointmentId)
        .populate("patient", "name email phone")
        .populate("doctor", "name specialization hospital");
};

// Update Appointment
const updateAppointment = async (appointmentId, updatedData) => {
    return await Appointment.findByIdAndUpdate(
        appointmentId,
        updatedData,
        { new: true }
    );
};

// Delete Appointment
const deleteAppointment = async (appointmentId) => {
    return await Appointment.findByIdAndDelete(appointmentId);
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};