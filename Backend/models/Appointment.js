const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
{
    patientName:{
        type:String,
        required:true
    },

    doctor:{
        type:String,
        required:true
    },

    hospital:{
        type:String,
        required:true
    },

    department:{
        type:String,
        required:true
    },

    village:{
        type:String,
        required:true
    },

    appointmentDate:{
        type:String,
        required:true
    },

    appointmentTime:{
        type:String,
        required:true
    },

    token:{
        type:String,
        unique:true,
        required:true
    },

    status:{
        type:String,
        default:"Confirmed"
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Appointment",appointmentSchema);