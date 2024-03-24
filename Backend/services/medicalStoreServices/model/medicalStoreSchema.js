const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const categoryCollection = require("./categorySchema");
const orderCollection = require("./orderSchema");


const medicalStoreSchema = new mongoose.Schema({
    medId:{
        type:String,
        required:true
    },
    storeName:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    license:{
        type:String,
        required:true
    },
    licenseFile:{
        type:String,
        required:true
    },
    storeImage:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default: function () {
            return this.email;
        },
        required:true
    },
    role:{
        type:String, 
        default:"Medical Store"
    },
    mobile:{
        type:Number,
        required:true
    },
    address: {
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
    products:[{
        productId:{
            type: String,
        },
        productName:{
            type: String
        },
        productImages:{
            type: String
        },
        productCategory:{
            type: String,
            ref: 'categorydetails'
        },
        mfgDate:{
            type: Date,
        },
        expDate:{
            type: Date,
        },
        price:{
            type: Number
        },
        stock:{
            type: Number
        },
        description:{
            type: String
        },
    }],
    deliveryExecLocation:{
        latitude:{
            type:Number,
            default: function () {
                return this.address.latitude;
            }
        },
        longitude:{
            type:Number,
            default: function () {
                return this.address.longitude;
            }
        }
    },
    orders:[{
        type: String,
        ref: 'orderdetails'
    }],
    mobileVerified: {
        type:Boolean,
        default: false
    },
    emailVerified: {
        type:Boolean,
        default: false
    },
    isBlocked:{
        type:Boolean,
        default: false
    },
    applicationStatus:{
        type:String,
        default: "Pending" // Pending, Accepted, Rejected
    }
})

const medicalStoreCollection = new mongoose.model("medicalstoredata",medicalStoreSchema);
module.exports = medicalStoreCollection;