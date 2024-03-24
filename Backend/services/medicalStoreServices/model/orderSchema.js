const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
    orderId:{
        type:String,
        default:uuidv4,
        unique:true
    },
    medId:{
        type: String,
        required: true
    },
    medName:{
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
    },
    razorpayOrderId: {
        type: String,
    },
    deliveryAddress: {
        address:{
            type: String,
        },
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    },
    products: [{
        productId:{
            type:String
        },
        productName:{
            type:String
        },
        price:{
            type:Number
        },
        productImages:{
            type:String
        },
        productQuantity:{
            type:Number,
        }
    }],
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderTime: {
        type: String,
    },
    orderTotal:{
        type: Number
    }
    ,
    paymentStatus:{
        type:String,
        default:"Pending"
    },
    orderStatus:{
        type:String,
        default:"Pending"
    },
    deliveryTime:{
        type:String
    }
});

orderSchema.pre('save', function (next) {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Kolkata' };
    this.orderTime = new Date().toLocaleTimeString(undefined, options);
    next();
});

const orderCollection = new mongoose.model('orderdetails', orderSchema);
module.exports = orderCollection;