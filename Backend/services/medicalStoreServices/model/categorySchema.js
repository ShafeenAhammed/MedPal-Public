const mongoose=require("mongoose");
const { v4: uuidv4 } = require('uuid');

const categorySchema=new mongoose.Schema({
    categoryId:{
        type : String,
        default: uuidv4,
        unique : true
    },
    categoryName : {
        type : String,
        required : true
    },
    enabled:{
        type: Boolean,
        default:true
    }
});

const categoryCollection = new mongoose.model("categorydetails",categorySchema);
module.exports = categoryCollection;