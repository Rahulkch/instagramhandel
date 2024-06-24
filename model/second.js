const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;


const postschema=new mongoose.Schema({
    body:{
        type:String,
        required:true,
    },
   
    photos:{
        type:String,
        default:true
    },
    postedby:{
        type:ObjectId,
        ref:"display" },
    likes:[{type:ObjectId,ref:"display"}],
    comments:[{
        comment:{type:String},
        postedby:{
            type:ObjectId,
            ref:"display"
        }
        
    }]
},{timestamps:true})

module.exports=mongoose.model("postschema",postschema);