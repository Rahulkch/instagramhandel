const mongoose=require("mongoose");
require("dotenv").config();

const xyz_database=() =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then( () => console.log("db is connection succesfully"))
    .catch((e) => {
        console.log("issue in connecting data bse ",e);
    })

}
module.exports=xyz_database;