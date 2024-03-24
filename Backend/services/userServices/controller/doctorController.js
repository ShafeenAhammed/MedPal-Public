const jwt = require('jsonwebtoken');
const notification = require('notification-npm-package');
const doctorCollection = require('../model/doctorSchema');

require("dotenv").config();



module.exports = {
    register: async(req,res)=>{
        try{
            // console.log(req.body);
            const doctorDatas = JSON.parse(req.body.doctorData);
            const {
                name,
                sex,
                email,
                mobile,
                license,
                age,
                specialization,
                currentHospital,
                experience,
                fees,

            } = doctorDatas
            const doctorImage = req.files['doctorImage'][0].filename;
            const licenseFile = req.files['licenseFile'][0].filename;
            const check= await doctorCollection.findOne({email:email});
            if(check){
                res.status(400).json({message:"Email already exists",email:email,success:false});
            }else{
                await doctorCollection.insertMany({
                    name,
                    sex,
                    email,
                    mobile,
                    license,
                    age,
                    specialization,
                    currentHospital,
                    experience,
                    fees,
                    doctorImage,
                    licenseFile
                });
                let config = {
                    service: "gmail",
                    user: process.env.MAILUSER,
                    password: process.env.MAILUSERTOKEN
                }
                let subject = "Doctor Application";
                let text = `Dear ${name}, we have recieved your application and we are currently looking into it`;
                let to = email
    
                notification.sendEmail(to, subject, text, config).then(res => console.log('Email sent:', res.messageId))
                .catch(error => console.error('Error sending email:', error));
                res.status(200).json({message:"success", email:email,success:true});
            }
        }
        catch(err){
            console.error("Error in registering medcial store", err);
            res.status(500).json({
                status: 'error',
                message: `Error registering medcial store => ${err}`,
            });
        }
    },
    login: async (req,res)=>{
        try{
            console.log(req.body.email);
            const check = await doctorCollection.findOne({ email: req.body.email })
            if(!check){
                res.json({message:"Invalid email",authentication:false})
            }else{
                // const checkPassword = await bcrypt.compare(req.body.password, check.password);
                if (check.password === req.body.password) {

                    const token = jwt.sign({ id:check.doctorId, role:check.role, name:check.name}, process.env.TOKENSECRETKEY, {expiresIn:"2h"});
                    res.json({message:"Login Success",authentication:true, token:token, role:"Doctor", user:check});
                } else {
                    res.json({message:"Invalid Password",authentication:false});
                }
            }
        }
        catch(err){
            console.error("Error in doctor login",err);
            res.status(500).json({message:`Error::->${err}`,authentication:false});
        }
    }
}