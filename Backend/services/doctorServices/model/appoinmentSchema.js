const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const appoinmentSchema = new mongoose.Schema({
    appoinmentId:{
        type:String,
        default:uuidv4,
    },
    customerId:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true,
    },
    doctorName:{
        type:String,
        required:true
    },    
    fees:{
        type:Number,
        required:true
    },
    timeSlot: {
        startTime: {
            type: Date,
            // required: true,
        },
        endTime: {
            type: Date,
            // required: true,
        },
    },
    appoinmentStatus:{
        type:String,
        default: "Pending" // Pending, Completed
    },
    paymentStatus:{
        type:String,
        default: "Pending" // Pending, Success, Failed
    },
    paymentId: {
        type: String,
    },
    razorpayOrderId: {
        type: String,
    },
})

const appoinmentCollection = new mongoose.model("appoinmentdata",appoinmentSchema);
module.exports = appoinmentCollection;