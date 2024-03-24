const notification= require('notification-npm-package');
const axios = require('axios');
// require("dotenv").config();
// const client = redis.createClient({legacyMode:true,url:'redis://127.0.0.1:6379'});
// client.on('connect', () => {
//     console.log('Connected to Redis server');
//   });
  
// client.on('error', (err) => {
// console.error('Error connecting to Redis:', err);
// });
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const admin = require("firebase-admin");
const {getMessaging} = require("firebase-admin/messaging");

const serviceAccount = require('../medpal-5ae11-firebase-adminsdk-6m3de-5fe0c610ee.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var otp=''
const customerCollection = require('../model/customerSchema');
module.exports={
    registerCustomer : async(req,res)=>{
        try{
            console.log("reg body", req.body);
            const data = {
                name:req.body.name,
                email:req.body.email,
                age:req.body.age,
                sex:req.body.sex,
                mobile:req.body.mobile,
                password : await bcrypt.hash(req.body.password, 10)
            }
            const {email}=req.body;
            const check= await customerCollection.findOne({email:email});
            if(check){
                    res.json({message:"Email already exists",email:email,exist:true});
            }else{
                await customerCollection.insertMany([data]);
                res.json({message:"success", email:email, exist:false});
            }
        }
        catch(err){
            console.error("Error in registering user",err);
        }
    },
    otpGenerateAndSend : async(req,res)=>{
        try{
            console.log("MAIL",process.env.MAILUSER);
            let temp='';
            for (let i = 0; i < 4; i++) {
                temp += Math.floor(Math.random() * 10);
            }
            otp=temp;
            temp='';
            console.log("otp",otp);
            // client.set(req.query.email, otp, 'EX', 300);
            // client.setEx(req.query.email, otp, 'EX', 300, (err, reply) => {
            //     if (err) {
            //       console.error('Error setting OTP in Redis:', err);
            //       res.status(500).json({ message: 'Error generating OTP' });
            //     } else {
            //       console.log('OTP set in Redis:', reply);
            //       // Continue with other operations
            //     }
            // });
            let config = {
                service: "gmail",
                user: process.env.MAILUSER,
                password: process.env.MAILUSERTOKEN
            }
            let subject = "Account Verification";
            let text = `OTP for verifying your account is ${otp}`;
            let to = req.query.email

            notification.sendEmail(to, subject, text, config).then(res => console.log('Email sent:', res.messageId))
            .catch(error => console.error('Error sending email:', error));

            res.status(200).json({
                status: 'success',
                message: 'OTP generated and email sent successfully',
            });

        }
        catch(err){
            console.error("Error in otp", err);
            res.status(500).json({
                status: 'error',
                message: 'Error generating OTP and sending email',
            });
        }
    },
    otpVerification: async(req,res)=>{
        try{
            console.log("bodyyy",req.body.otp);
            console.log("bodyyy",req.body);
            
            if(otp === req.body.otp){
                await customerCollection.updateOne({email:req.body.email},{$set:{emailVerified:true}})
                res.status(200).json({
                    status: 'success',
                    message: 'Verified OTP',
                });
            }else{
                res.status(500).json({
                    status: 'failed',
                    message: 'OTP verification failed',
                });
            }

            // client.get(req.body.email, (err, otp) => {
            //     if (err) {
            //         console.error("Error in retrieving OTP from Redis", err);
            //         return res.status(500).json({ message: "Error in verifying OTP" });
            //     }
            //     console.log("OTP from Redis", otp);
            //     if (otp === req.body.otp) {
            //         res.json({ message: "success" })
            //     } else {
            //         res.json({ message: "failed" })
            //     }
            // });
        }
        catch(err){
            console.error("Error in verifying otp", err);
            res.status(500).json({
                status: 'error',
                message: 'Error verifying OTP',
            });
        }
    },
    login: async (req,res)=>{
        try{
            console.log(req.body.email);
            const check = await customerCollection.findOne({ email: req.body.email })
            console.log(check);
            if(!check){
                res.json({message:"Invalid email",authentication:false})
            }else{
                const checkPassword = await bcrypt.compare(req.body.password, check.password);
                if (checkPassword) {
                    const token = jwt.sign({ id:check.customerId, role:check.role, name:check.name}, process.env.TOKENSECRETKEY, {expiresIn:"2h"});
                    res.json({message:"Login Success",authentication:true, token:token, role:"User", user:check});
                } else {
                    res.json({message:"Invalid Password",authentication:false});
                }
            }
        }
        catch(err){
            console.error("Error in customer login",err);
            res.status(500).json({message:`Error::->${err}`,authentication:false});
        }
    },

    getCustomerDetails: async(req,res)=>{
        try{
            const customer = await customerCollection.findOne({customerId: req.query.customerId});
            res.status(200).json({message:"customer details fetched", customer:customer});
        }
        catch(err){
            console.error("Error in fetching customer details",err);
            res.status(500).json({message:`Error::->${err.message}`});
        }
    },

    addAddress: async(req,res)=>{
        try{
            console.log(req.body);
            await customerCollection.updateOne(
                {customerId:req.body.customerId},
                { $push: { address: req.body.address } },
                { new: true }
            );
            res.status(200).json({ message: "Address added successfully", success: true});
        }
        catch(err){
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getAddress: async(req,res)=>{
        try{
            const address = await customerCollection.findOne({customerId:req.query.customerId},{address:1,_id:0});
            console.log(address);
            res.status(200).json({ message: "Address fetched successfully", address:address.address,success: true});
        }
        catch(err){
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getCartProducts: async (req,res)=>{
        try{
            console.log(req.query.customerId);
            const products = await customerCollection.findOne({customerId:req.query.customerId},{cart:1,_id:0});
            let totalProducts = 0;
            for(let i=0;i<products.cart.length;i++){
                totalProducts+=products.cart[i].productQuantity;
            }
            console.log("tot",products);
            res.status(200).json({count:totalProducts,cart:products.cart, success:true})
        }
        catch(err){
            console.error("error in getting cart",err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    addToCart: async(req,res)=>{
        try{
            const productId  = req.body.data.productId;
            console.log(req.body.data.customerId);
            const customer = await customerCollection.findOne({ customerId: req.body.data.customerId })
            const checkCart = customer.cart.findIndex(product => product.productId === productId);
            console.log(checkCart);
            if(checkCart !== -1){
                customer.cart[checkCart].productQuantity += 1;
            }else{
                try{
                    const medServiceResponse = await axios.get(`http://localhost:3002/medicalstore/getproduct?productId=${productId}`);
                    // console.log(medServiceResponse.data);
                    const product = medServiceResponse.data.product;
                    const newCartItem = {
                        productId: product.productId,
                        productName: product.productName,
                        price: product.price,
                        productImages: product.productImages,
                        productQuantity: 1
                    };
        
                    customer.cart.push(newCartItem);
                }
                catch(err){
                    console.log(err);
                }
            }

            await customer.save();
    
            res.status(200).json({ message: "Product added to cart successfully", cart: customer.cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    removeCart: async(req,res)=>{
        try {
            const productId = req.body.data.productId;
            const customerId = req.body.data.customerId;

            const customer = await customerCollection.findOne({ customerId: customerId });

            const productIndex = customer.cart.findIndex(item => item.productId === productId);
    
            if (productIndex !== -1) {
                const product = customer.cart[productIndex];    
                if (product.productQuantity > 1) {
                    product.productQuantity -= 1;
                } else {
                    customer.cart.splice(productIndex, 1);
                }
                await customer.save();
                res.status(200).json({ success: true, message: 'Cart updated successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Product not found in the cart' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    emptyCart: async (req,res)=>{
        try{
            await customerCollection.updateOne({customerId: req.body.customerId}, {$set:{cart:[]}});
            res.status(200).json({ success: true, message: 'Cart updated successfully' });
        }
        catch(err){
            console.error("empty cart error",err.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    addFcmToken: async(req,res)=>{
        try{
            console.log(req.body);
            await customerCollection.updateOne({customerId: req.body.customerId}, { $addToSet: { fcmTokens: req.body.fcmToken } });
            res.status(200).json({ success: true, message: 'FCM Token added successfully' });
        }
        catch(err){
            console.error("add fcm token error",err.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    sendNotifcation: async (req,res)=>{
        try{
            const { customerId, title, body } = req.body;
            const data = await customerCollection.findOne({customerId},{fcmTokens:1,_id:0});
            const tokens = data.fcmTokens;

            const message = {
              data: {
                title,
                body,
              },
              tokens,
            };
            
            admin.messaging().sendMulticast(message)
              .then((response) => {
                console.log('Successfully sent message:', response);
                res.json({ success: true, message: 'Notification sent successfully.' });
              })
              .catch((error) => {
                console.error('Error sending message:', error);
                res.status(500).json({ success: false, message: 'Failed to send notification.' });
              });
        }
        catch(err){
            console.log("error in sending noti",err);
        }

        // try {
        //     const { customerId, title, body } = req.body;
        
        //     // Fetch customer FCM tokens
        //     const customer = await customerCollection.findOne({ customerId }, { fcmTokens: 1, _id: 0 });
        //     const tokens = customer.fcmTokens;
        
        //     // Create the notification message
        //     const message = {
        //       notification: {
        //         title,
        //         body,
        //       },
        //       tokens,
        //     };
        
        //     // Send the notification using sendMulticastAsync
        //     const response = await admin.messaging().sendMulticastAsync(message);
        
        //     // Handle success and error responses
        //     console.log('Successfully sent message:', response);
        //     res.json({ success: true, message: 'Notification sent successfully.' });
        //   } catch (error) {
        //     console.error('Error sending message:', error);
        //     res.status(500).json({ success: false, message: 'Failed to send notification.' });
        //   }
    }
}