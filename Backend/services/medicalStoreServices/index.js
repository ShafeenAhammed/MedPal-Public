const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const medicalStoreRoute = require('./routes/medicalStore');
const path = require('path');
const http = require('http');
const cors = require('cors');
const configureSocket = require('./config/socketio');

mongoose.connect(process.env.MONGO_CONNECTION).then(()=>console.log("MongoDB connected...")).catch((err)=>console.log("MongoDB failed to conenct",err));

const app= express();



const server = http.createServer(app);
configureSocket(server);

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));
// app.use('/static',express.static(path.join(__dirname,'assets')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT;

app.use((req, res, next) => {
    console.log(`inside medicalstoreservice${req.method} ${req.url}`);
    next();
});

app.use('/medicalstore',medicalStoreRoute);

server.listen(PORT,()=>{console.log("running in 3002");})