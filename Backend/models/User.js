const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: [
            "patient",
            "doctor",
            "hospital",
            "asha",
            "admin"
        ],
        default: "patient"
    },

    phone: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other"
    },

    age: {
        type: Number,
        default: 0
    },

    bloodGroup: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    emergencyContact: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);