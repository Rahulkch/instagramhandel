const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types;
const userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    followers:[{type:ObjectId,ref:"display"}],
    following:[{type:ObjectId,ref:"display"}]
})
module.exports=mongoose.model("display",userschema);