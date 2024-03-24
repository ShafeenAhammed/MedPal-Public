const mongoose=require("mongoose");
const { v4: uuidv4 } = require('uuid');

const customerSchema = new mongoose.Schema({
    customerId:{
        type:String,
        default:uuidv4,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String, 
        default:"Customer"
    },
    mobile:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    // address:[{
    //     houseNumber:{
    //         type:String
    //     },
    //     area:{
    //         type:String
    //     },
    //     city:{
    //         type:String
    //     },
    //     pincode:{
    //         type:Number
    //     },
    //     state:{
    //         type:String
    //     },
    //     latitude:{
    //         type:Number
    //     },
    //     longitude:{
    //         type:Number
    //     }
    // }],
    address:[
        {
            address:{
                type: String,
            },
            latitude:{
                type:Number
            },
            longitude:{
                type:Number
            }
        }
    ] ,
    cart:[{
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
            default:1
        }
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
    fcmTokens: [
        {
            type: String
        }
    ],
})

const customerCollection = new mongoose.model("customerdata",customerSchema);
module.exports = customerCollection;