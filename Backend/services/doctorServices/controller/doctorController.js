const jwt = require('jsonwebtoken');
const notification = require('notification-npm-package');
const doctorCollection = require('../model/doctorSchema');
const path = require('path');
const Razorpay = require('razorpay');
const appoinmentCollection = require('../model/appoinmentSchema');
require("dotenv").config();
const moment = require("moment");

module.exports = {
    getSlots: async (req,res)=>{
        try {
            const doctorId = req.query.doctorId;
            const doctor = await doctorCollection.findOne({doctorId:doctorId});
            if (!doctor) {
              return res.status(404).json({ message: 'Doctor not found' });
            }
        
            res.status(200).json(doctor.appointmentSlots);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
    },

    addSlot: async (req, res) => {
      try {
        // console.log(req.body);
        const { doctorId, newSlot } = req.body;
    
        const doctor = await doctorCollection.findOne({ doctorId });
        if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
        }

        newSlot.forEach(slot => {
          doctor.appointmentSlots.push(slot);
        });
    
        await doctor.save();
    
        res.status(201).json({ message: 'Slots added successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    

    getDoctors: async (req, res) => {
        try {
          const doctors = await doctorCollection.find();
          res.status(200).json({doctors:doctors});
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    },

    specialization: async (req,res)=>{
        const specialization = req.query.specialization;

        try {
          const doctors = await doctorCollection.find({ specialization });
          res.json(doctors);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    },

    getDoctorById: async (req,res)=>{
        try {
            const doctor = await doctorCollection.findOne({doctorId: req.query.doctorId});
            // console.log(doctor);
            res.status(200).json({doctor:doctor});
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    getDocImg: async (req,res)=>{
      try {
          const imageName = req.query.imageName;
          const imagePath = path.join(__dirname, '../assets/uploads', imageName);
          // console.log("pathuu",imagePath);
          res.sendFile(imagePath);
      } catch (err) {
          console.error('Error retrieving product image:', err.message);
          res.status(500).json({ error: `Error retrieving product image => ${err.message}` });
      }
  },
    makeAppoinment: async (req,res)=>{
        try {
            const razorpayInstance = new Razorpay({
                key_id: process.env.RAZORPAY_ID_KEY,
                key_secret: process.env.RAZORPAY_SECRET_KEY
            });

            const order = await razorpayInstance.orders.create({
                amount: req.body.fees *100,
                currency: 'INR',
              });

            const addedAppoinment = await appoinmentCollection.create(req.body);
            console.log("Order inserted:", order);
            console.log("Order ID:", order.id);
            res.status(200).json({
                success:true,
                status: 'success',
                message: 'Order placed successfully',
                order_id: order.id,
                appoinment: addedAppoinment
            });
        } catch (err) {
            console.error("Error placing order:", err);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error placing order',
            });
        }
    },

    updateAppoinment: async (req,res)=>{
        try{
            console.log("update",req.body);
            if(req.body.paymentStatus === 'Success'){
                const newApp = await appoinmentCollection.findOneAndUpdate({appoinmentId: req.body.appoinmentId},{$set:{paymentId:req.body.paymentId, razorpayOrderId:req.body.razorpayOrderId,paymentStatus:req.body.paymentStatus,orderStatus:req.body.orderStatus}},{ returnDocument: 'after'})

                if (newApp) {
                    await doctorCollection.findOneAndUpdate(
                      {
                        doctorId: newApp.doctorId,
                        'appointmentSlots.slotId': req.body.slotId
                      },
                      {
                        $set: {
                          'appointmentSlots.$.isBooked': true
                        }
                      }
                    );
                }
                res.status(200).json({
                    success: true,
                    status: 'success',
                    message: 'Appoinment updated successfully',
                    appoinmentId: req.body.appoinmentId
                  });
            }else{
                await appoinmentCollection.updateOne({appoinmentId: req.body.appoinmentId},{$set:{paymentId:req.body.paymentId, razorpayOrderId:req.body.razorpayOrderId,paymentStatus:req.body.paymentStatus,orderStatus:req.body.orderStatus}});
            }
        }
        catch(err){
            console.error("Error updating appoinment:", err.message);
            res.status(500).json({
                success:false,
                status: 'failed',
                message: 'Error updating appoinment',
            });
        }
    },
    getCustomerAppoinments: async (req, res) => {
      try {

        const appoinments = await appoinmentCollection.find({customerId: req.query.customerId});
        res.status(200).json({appoinments:appoinments});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    getDocAppoinments: async (req, res) => {
      try {

        const appoinments = await appoinmentCollection.find({doctorId: req.query.doctorId});
        res.status(200).json({appoinments:appoinments});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    docStats: async (req,res)=>{
      try{
        const topDoctors = await appoinmentCollection.aggregate([
          { $group: { _id: "$doctorId", doctorName: { $first: "$doctorName" }, totalAppointments: { $sum: 1 } } },
          { $sort: { totalAppointments: -1 } },
          { $limit: 4 }
        ]);
        // console.log("Top 4 Doctors with Most Appointments:",topDoctors);

        const totalBookings = await appoinmentCollection.aggregate([
          {
            $lookup: {
              from: "doctordatas",
              localField: "doctorId",
              foreignField: "doctorId",
              as: "doctor",
            },
          },
          { $unwind: "$doctor" },
          { $group: { _id: "$doctor.specialization", totalBookings: { $sum: 1 } } },
        ]);
        // console.log("Total Bookings in Each Specialization:",totalBookings);

        res.status(200).json({topDoctors: topDoctors, totalSpecBookings: totalBookings});
      }
      catch (error) {
        console.error("Error finding  doctor stats:", error);
        res.status(500).json({ error: error.message });
      }      
    },

    completeAppointment: async(req,res)=>{
      try{
        await appoinmentCollection.updateOne({appoinmentId: req.body.appointmentId}, {$set:{appoinmentStatus: 'Completed'}})
        res.status(200).json({success: true})
      }
      catch(err){
        console.log("error in completing appointment",err.message);
        res.status(500).json({ success: false,error: err.message });
      }
    },

}

async function deleteExpiredSlots() {
  try {
    const doctors = await doctorCollection.find({});
    doctors.forEach(async doctor => {
      const currentTime = new Date();
      const expiredSlots = doctor.appointmentSlots.filter(slot => moment(slot.endTime).isBefore(currentTime));
      if (expiredSlots.length > 0) {
        expiredSlots.forEach(async expiredSlot => {
          const index = doctor.appointmentSlots.findIndex(slot => slot.slotId === expiredSlot.slotId);
          doctor.appointmentSlots.splice(index, 1);
        });
        await doctor.save();
        console.log(`Expired slots deleted for doctor: ${doctor.name}`);
      }
    });
  } catch (error) {
    console.error("Error deleting expired slots:", error);
  }
}

setInterval(deleteExpiredSlots, 60 * 60 * 1000); // Execute every 1 hour

deleteExpiredSlots();