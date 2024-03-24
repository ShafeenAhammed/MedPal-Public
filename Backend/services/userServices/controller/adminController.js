const adminCollection = require("../model/adminSchema");
const jwt = require('jsonwebtoken');
const notification = require('notification-npm-package');
const customerCollection = require("../model/customerSchema");
const medicalStoreCollection = require("../model/medicalStoreSchema");
const axios = require('axios');
const path = require('path');
const fs = require('fs');
var FormData = require('form-data');
const { Kafka } = require('kafkajs');

const doctorCollection = require("../model/doctorSchema");

const kafka = new Kafka({
    clientId: 'admin-service',
    brokers: ['localhost:29092'],
  });
  
  const producer = kafka.producer();

module.exports={
    login: async (req,res)=>{
        try{
            console.log(req.body.email);
            const check = await adminCollection.findOne({ email: req.body.email })
            if(!check){
                res.json({message:"Invalid email",authentication:false})
            }else{
                if (check.password === req.body.password) {
                    const token = jwt.sign({ id:check._id, role:check.role }, process.env.ADMINSECRETKEY, {expiresIn:"2h"});
                    res.json({message:"Login Success",authentication:true, token:token, role:"Admin"})
                } else {
                    res.json({message:"Invalid Password",authentication:false});
                }
            }
        }
        catch(err){
            console.error("Error in admin login",err);
            res.json({message:`Error::->${err}`,authentication:false});
        }
    },
    getCustomers: async (req,res)=>{
        try{
            const customers = await customerCollection.find();
            res.status(200).json({customers:customers,message:"success"});
        }
        catch(err){
            console.error("Error in getting customer datas",err);
            res.status(500).json({message:`Some error occurred ${err}`});
        }
    },
    blockCustomers: async (req,res)=>{
        try{
            const customer = await customerCollection.findOne({email : req.body.email});
            if(customer.isBlocked === false){
                await customerCollection.updateOne({email : req.body.email},{$set:{isBlocked:true}});
                res.status(200).json({
                    status: 'success',
                    message: `Blocked customer ${customer.name}`,
                });
            }else{
                await customerCollection.updateOne({email : req.body.email},{$set:{isBlocked:false}})
                res.status(200).json({
                    status: 'success',
                    message: `Unblocked customer ${customer.name}`,
                });
            }
        }catch(err){
            console.error("Error in getting customer datas",err);
            res.status(500).json({
                status: 'failed',
                message: `Error in blockCustomer ${err}`
            });
        }
    },
    getMedRequests: async (req,res)=>{
        try{
            const medRequests = await medicalStoreCollection.find({applicationStatus:"Pending"});
            res.status(200).json({medRequests:medRequests,message:"success"});
        }
        catch(err){
            console.error("Error in getting customer datas",err);
            res.status(500).json({message:`Some error occurred ${err}`});
        }
    },
    getMedLicenseFile: async (req,res)=>{
        try {
            const fileName = req.query.fileName;
            const filePath = path.join(__dirname, '../assets/uploads', fileName);
            res.sendFile(filePath);
        } catch (err) {
            console.error('Error retrieving product image:', err.message);
            res.status(500).json({ error: `Error retrieving product image => ${err.message}` });
        }
    },
    medReqDecision: async (req,res)=>{
        try{
            console.log("body",req.body);
            const med = await medicalStoreCollection.findOneAndUpdate({email: req.body.email},{$set:{applicationStatus:req.body.applicationStatus}},{returnDocument: 'after'});

            let config = {
                service: "gmail",
                user: process.env.MAILUSER,
                password: process.env.MAILUSERTOKEN
            }

            if(med.applicationStatus === 'Accepted'){

                let subject = "Medical Store Application";
                let text = `Dear ${med.ownerName}, your store ${med.storeName} is ${med.applicationStatus}. Your username is ${med.email} and your password is ${med.password}`;
                let to = med.email
    
                notification.sendEmail(to, subject, text, config).then(res => console.log('Email sent:', res.messageId))
                .catch(error => console.error('Error sending email:', error));

                try {
                    const boundary = `Boundary_${new Date().getTime()}`;
                    const formData = new FormData();
                    formData.append('storeDatas',JSON.stringify(med))
                    const storeImagePath = path.join(__dirname, '../assets/uploads', med.storeImage);
                    const licenseFilePath = path.join(__dirname, '../assets/uploads', med.licenseFile);
                    console.log("path",storeImagePath);
                    console.log("pathLicense",licenseFilePath);
                    formData.append('storeImage', fs.createReadStream(storeImagePath));
                    formData.append('licenseFile', fs.createReadStream(licenseFilePath));

                    const medServiceResponse = await axios.post(
                        'http://localhost:3002/medicalstore/register-medicalstore',
                        formData,
                        {
                            headers: {
                                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                                ...formData.getHeaders(),
                            }
                        }
                    );
    
                    console.log('Medical store details stored in the med db:', medServiceResponse.data);
                    res.status(200).json({
                        status: 'success',
                        message: `${med.applicationStatus} ${med.storeName}`,
                    });

                } catch (error) {
                    console.error('Error storing medical store details in the med db:', error.message);
    
                    res.status(500).json({
                        status: 'failed',
                        message: `Error storing medical store details in the med db ${error}`
                    });
                }

                // res.status(200).json({
                //     status: 'success',
                //     message: `${med.applicationStatus} ${med.storeName}`,
                // });

            } else if(med.applicationStatus === 'Rejected') {

                let subject = "Medical Store Application";
                let text = `Dear ${med.ownerName}, your store ${med.storeName} is ${med.applicationStatus}.`;
                let to = med.email
    
                notification.sendEmail(to, subject, text, config).then(res => console.log('Email sent:', res.messageId))
                .catch(error => console.error('Error sending email:', error));
    
                res.status(200).json({
                    status: 'success',
                    message: `${med.applicationStatus} ${med.storeName}`,
                });
            }
        }
        catch(err){
            console.error("Error in changing status",err.message);
            res.status(500).json({
                status: 'failed',
                message: `Error in medReqDecision ${err.message}`
            });
        }
    },

    getMedicalStores: async (req,res)=>{
        try{
            console.log("heree");
            const meds = await medicalStoreCollection.find({applicationStatus:'Accepted'});
            res.status(200).json({meds:meds,message:"success"});
        }
        catch(err){
            console.error("Error in getting meds datas",err);
            res.status(500).json({message:`Some error occurred ${err}`});
        }
    },
    blockMedicalStores: async (req,res)=>{
        try{
            const med = await medicalStoreCollection.findOne({email : req.body.email});
            if(med.isBlocked === false){
                await medicalStoreCollection.updateOne({email : req.body.email},{$set:{isBlocked:true}});
                res.status(200).json({
                    status: 'success',
                    message: `Blocked medical store ${med.name}`,
                });
            }else{
                await medicalStoreCollection.updateOne({email : req.body.email},{$set:{isBlocked:false}})
                res.status(200).json({
                    status: 'success',
                    message: `Unblocked medical store ${med.name}`,
                });
            }
        }catch(err){
            console.error("Error in getting med blcoking/unblocking",err);
            res.status(500).json({
                status: 'failed',
                message: `Error in blockMedicalStore ${err}`
            });
        }
    },

    getDoctorRequests: async (req,res)=>{
        try{
            const docRequests = await doctorCollection.find({applicationStatus:"Pending"});
            res.status(200).json({docRequests:docRequests,message:"success"});
        }
        catch(err){
            console.error("Error in getting doc requests",err);
            res.status(500).json({message:`Some error occurred ${err}`});
        }
    },
    getDoctorLicenseFile: async (req,res)=>{
        try {
            const fileName = req.query.fileName;
            const filePath = path.join(__dirname, '../assets/uploads', fileName);
            res.sendFile(filePath);
        } catch (err) {
            console.error('Error retrieving doc license:', err.message);
            res.status(500).json({ error: `Error retrieving doc license => ${err.message}` });
        }
    },
    docReqDecision: async (req,res)=>{
        try{
            console.log("body",req.body);
            const doc = await doctorCollection.findOneAndUpdate({email: req.body.email},{$set:{applicationStatus:req.body.applicationStatus}},{returnDocument: 'after'});

            let config = {
                service: "gmail",
                user: process.env.MAILUSER,
                password: process.env.MAILUSERTOKEN
            }

            if(doc.applicationStatus === 'Accepted'){

                let subject = "Doctor Application";
                let text = `Dear ${doc.name}, your application is ${doc.applicationStatus}. Your username is ${doc.email} and your password is ${doc.password}`;
                let to = doc.email
    
                notification.sendEmail(to, subject, text, config).then(res => console.log('Email sent:', res.messageId))
                .catch(error => console.error('Error sending email:', error));

                const doctorImagePath = path.join(__dirname, '../assets/uploads', doc.doctorImage);
                const licenseImagePath = path.join(__dirname, '../assets/uploads', doc.licenseFile);
                const doctorImageBase64 = fs.readFileSync(doctorImagePath, 'base64');
                const licenseFileBase64 = fs.readFileSync(licenseImagePath, 'base64');

                await producer.connect();
                await producer.send({
                  topic: 'doc-req-accepted',
                  messages: [
                    { value: JSON.stringify({
                        doc,
                        doctorImageBase64,
                        licenseFileBase64
                    }) },
                  ],
                });
                await producer.disconnect();

                res.status(200).json({
                    status: 'success',
                    message: `${doc.applicationStatus} ${doc.name}`,
                });

            } else if(doc.applicationStatus === 'Rejected') {

                let subject = "Doctor Application";
                let text = `Dear ${doc.name}, your application is ${doc.applicationStatus}.`;
                let to = med.email
    
                notification.sendEmail(to, subject, text, config).then(res => console.log('Email sent:', res.messageId))
                .catch(error => console.error('Error sending email:', error));
    
                res.status(200).json({
                    status: 'success',
                    message: `${doc.applicationStatus} ${doc.name}`,
                });
            }
        }
        catch(err){
            console.error("Error in changing doctor req status",err.message);
            res.status(500).json({
                status: 'failed',
                message: `Error in docReqDecision ${err.message}`
            });
        }
    },
}