const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const doctorSchema = new mongoose.Schema({
    doctorId:{
        type:String,
        default:uuidv4,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String, 
        default:"Doctor"
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        default: function () {
            return this.email;
        },
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    license:{
        type:String,
        required:true
    },
    licenseFile:{
        type:String,
        required:true
    },
    doctorImage:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    currentHospital:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    fees:{
        type:Number,
        required:true
    },
    // appointmentSlots: [
    //     {
    //         startTime: {
    //             type: Date,
    //             // required: true,
    //         },
    //         endTime: {
    //             type: Date,
    //             // required: true,
    //         },
    //         isBooked: {
    //             type: Boolean,
    //             default: false,
    //         },
    //     }
    // ],
    applicationStatus:{
        type:String,
        default: "Pending" // Pending, Accepted, Rejected
    },
    isBlocked:{
        type:Boolean,
        default: false
    },
    emailVerified:{
        type:Boolean,
        default: false
    },
})

const doctorCollection = new mongoose.model("doctordata",doctorSchema);
module.exports = doctorCollection;