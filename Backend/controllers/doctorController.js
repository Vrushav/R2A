const bcrypt = require("bcrypt");
const doctorService = require("../services/doctorService");

// Create Doctor
const createDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            specialization,
            qualification,
            hospital,
            experience,
            consultationFee,
            availableDays,
            availableTimeSlots
        } = req.body;

        // Check if doctor already exists
        const existingDoctor = await doctorService.getDoctorByEmail(email);

        if (existingDoctor) {
            return res.status(409).json({
                success: false,
                message: "Doctor with this email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = await doctorService.createDoctor({
            name,
            email,
            password: hashedPassword,
            phone,
            specialization,
            qualification,
            hospital,
            experience,
            consultationFee,
            availableDays,
            availableTimeSlots
        });

        res.status(201).json({
            success: true,
            message: "Doctor created successfully.",
            doctor
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get All Doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();

        res.status(200).json({
            success: true,
            count: doctors.length,
            doctors
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Doctor By ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorService.getDoctorById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found."
            });
        }

        res.status(200).json({
            success: true,
            doctor
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update Doctor
const updateDoctor = async (req, res) => {
    try {
        const doctor = await doctorService.updateDoctor(
            req.params.id,
            req.body
        );

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor updated successfully.",
            doctor
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor
};