const mongoose  = require("mongoose");


const MovieSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true,},
    des:{type:String},
    img:{type:String,default: "",},
    imgTitle:{type:String,default: "",},
    imgSm:{type:String,default: "",},
    trailer:{type:String},
    vedio:{type:String},
    year:{type:String},
    limit:{type:Number},
    gener:{type:String},
    isSeries:{type:Boolean,default:false},
},
    {timestamps:true}
)

module.exports = mongoose.model("Movie",MovieSchema);
