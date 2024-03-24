const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const customerRoute = require('./routes/customer');
const adminRoute = require('./routes/admin');
const medicalStoreRoute = require('./routes/medicalStore');
const doctorRoute = require('./routes/doctor');

mongoose.connect(process.env.MONGO_CONNECTION).then(()=>console.log("MongoDB connected...")).catch((err)=>console.log("MongoDB failed to conenct",err));

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT;

app.use((req, res, next) => {
    console.log(`inside userservice${req.method} ${req.url}`);
    next();
});
app.use('/customer',customerRoute);
app.use('/admin',adminRoute);
app.use('/medicalstore',medicalStoreRoute);
app.use('/doctor',doctorRoute)

app.listen(PORT,()=>{console.log(`running in ${PORT}`)})