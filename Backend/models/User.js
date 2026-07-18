const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["patient", "doctor", "hospital", "admin"],
        default: "patient"
    },

    profileCompleted: {
        type: Boolean,
        default: false
    },

    phone: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other", ""],
        default: ""
    },

    age: {
        type: Number
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
    },

    specialization: {
        type: String,
        default: ""
    },

    qualification: {
        type: String,
        default: ""
    },

    hospital: {
        type: String,
        default: ""
    },

    experience: {
        type: Number,
        default: 0
    },

    consultationFee: {
        type: Number,
    default: 0
    },

    availability: [
    {
        day: {
            type: String,
            enum: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ]
        },

        isAvailable: {
            type: Boolean,
            default: true
        },

        startTime: {
            type: String
        },

        endTime: {
            type: String
        },

        consultationDuration: {
            type: Number,
            default: 30
         }
     }
    ],

    isAvailable: {
    type: Boolean,
    default: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);