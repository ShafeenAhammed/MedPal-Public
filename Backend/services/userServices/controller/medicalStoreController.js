const medicalStoreCollection = require("../model/medicalStoreSchema");
const jwt = require('jsonwebtoken');
const notification = require('notification-npm-package');
module.exports={
    register: async(req,res)=>{
        try{
            console.log(req.body);
            const storeDatas = JSON.parse(req.body.combinedDetails);
            const {
                storeName,
                ownerName,
                email,
                mobile,
                license,
                address,
            } = storeDatas
            console.log("add",address);
            const storeImage = req.files['storeImage'][0].filename;
            const licenseFile = req.files['licenseFile'][0].filename;
            const check= await medicalStoreCollection.findOne({email:email});
            if(check){
                res.status(400).json({message:"Email already exists",email:email,exist:true});
            }else{
                await medicalStoreCollection.insertMany({
                    storeName,
                    ownerName,
                    email,
                    mobile,
                    license,
                    address,
                    storeImage,
                    licenseFile
                });
                let config = {
                    service: "gmail",
                    user: process.env.MAILUSER,
                    password: process.env.MAILUSERTOKEN
                }
                let subject = "Medical Store Application";
                let text = `Dear ${ownerName}, we have recieved your application and we are currently looking into it`;
                let to = email
    
                notification.sendEmail(to, subject, text, config).then(res => console.log('Email sent:', res.messageId))
                .catch(error => console.error('Error sending email:', error));
                res.status(200).json({message:"success", email:email,exist:false});
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
            const check = await medicalStoreCollection.findOne({ email: req.body.email })
            // console.log(check);
            if(!check){
                res.json({message:"Invalid email",authentication:false})
            }else{
                // const checkPassword = await bcrypt.compare(req.body.password, check.password);
                if (check.password === req.body.password) {
                    const token = jwt.sign({ id:check.medId, role:check.role, name:check.ownerName}, process.env.TOKENSECRETKEY, {expiresIn:"2h"});
                    res.json({message:"Login Success",authentication:true, token:token, role:"Medical Store", user:check});
                } else {
                    res.json({message:"Invalid Password",authentication:false});
                }
            }
        }
        catch(err){
            console.error("Error in customer login",err);
            res.status(500).json({message:`Error::->${err}`,authentication:false});
        }
    }

}