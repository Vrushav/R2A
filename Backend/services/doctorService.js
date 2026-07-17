const User = require("../models/User");

// Create Doctor
const createDoctor = async (doctorData) => {
    doctorData.role = "doctor";

    const doctor = await User.create(doctorData);

    return doctor;
};

// Get All Doctors
const getAllDoctors = async () => {
    return await User.find({ role: "doctor" }).select("-password");
};

// Get Doctor By ID
const getDoctorById = async (doctorId) => {
    return await User.findOne({
        _id: doctorId,
        role: "doctor"
    }).select("-password");
};

const getDoctorByEmail = async (email) => {
    return await User.findOne({
        email,
        role: "doctor"
    });
};

// Update Doctor
const updateDoctor = async (doctorId, updatedData) => {
    return await User.findOneAndUpdate(
        {
            _id: doctorId,
            role: "doctor"
        },
        updatedData,
        {
            new: true
        }
    ).select("-password");
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    getDoctorByEmail,
    updateDoctor,
};