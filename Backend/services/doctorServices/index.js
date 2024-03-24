const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const kafkaHandler = require('./kafkaHandler');
const doctorRoute = require('./routes/doctor');
const http = require('http');
const cors = require('cors');
const configureSocket = require('./config/socketio');

mongoose.connect(process.env.MONGO_CONNECTION).then(()=>console.log("MongoDB connected...")).catch((err)=>console.log("MongoDB failed to conenct",err));

const app= express();

const server = http.createServer(app);
configureSocket(server);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT;

app.use((req, res, next) => {
    console.log(`inside doctor service${req.method} ${req.url}`);
    next();
});

// kafkaHandler.setupKafkaConsumer();

app.use('/doctor',doctorRoute)

server.listen(PORT,()=>{console.log(`running in ${PORT}`)})