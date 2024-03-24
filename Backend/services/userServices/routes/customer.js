const express= require("express");
const session= require("express-session");
const {v4:uuidv4}= require("uuid");
const customerRoute = express();
const customerController = require("../controller/customerController");
const customerMiddle = require("../middleware/customerMiddle");



customerRoute.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

customerRoute.use((req, res, next) => {
    console.log(`inside cutsomer routes${req.method} ${req.url}`);
    next();
});

customerRoute.post('/register',customerController.registerCustomer);
customerRoute.get('/otp',customerController.otpGenerateAndSend);
customerRoute.post('/otp-verification',customerController.otpVerification);
customerRoute.post('/login',customerController.login);
customerRoute.get('/getproductcount',customerController.getCartProducts);
customerRoute.post('/add-address',customerController.addAddress);
customerRoute.get('/get-address',customerController.getAddress);
customerRoute.patch('/addtocart',customerController.addToCart);
customerRoute.patch('/removeCart',customerController.removeCart);
customerRoute.patch('/emptycart',customerController.emptyCart);
customerRoute.patch('/add-fcmtoken', customerController.addFcmToken);
customerRoute.post('/send-notification', customerController.sendNotifcation);
customerRoute.get('/get-customerdetails',customerController.getCustomerDetails);

module.exports = customerRoute