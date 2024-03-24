const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const medicalStoreSchema = new mongoose.Schema({
    medId:{
        type:String,
        default:uuidv4,
        unique:true
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
    // products:[{
    //     productId:{
    //         type:String,
    //         default: uuidv4,
    //         unique:true
    //     },
    //     productName:{
    //         type: String,
    //         required:true
    //     },
    //     productImages:{
    //         type: String,
    //         required:true
    //     },
    //     price:{
    //         type: Number,
    //         required:true
    //     },
    //     stock:{
    //         type: Number,
    //         required:true
    //     },
    //     description:{
    //         type: String,
    //         required:true
    //     },
    // }],
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