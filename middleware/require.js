const jwt=require("jsonwebtoken")
require("dotenv").config();
const display=require("../model/first");
const mongoose=require("mongoose");

// module.exports= (req,res,next)=>{
//     const {authorization}=req.headers;
//     if(!authorization){
//         return res.status(4000).json({
//             error:"You must logi in -1 authh wala "
//         })}
//         const token=authorization.replace("Bearer ","");
//         console.log(token)
//         jwt.verify(token,process.env.JWT_URL,(err,payload) =>{
//             if(err){
//                 return res.status(401).json({error:"You must login -2"})
//             }
//             const {id}=payload;
//             console.log("payload m ye ya a",payload)
//             display.findById(id).then(userdata => {
//                 // res.status(200).json({
//                 // meaage:"U are a verified user",  
//                 // data:userdata
//                 console.log("user data  \n",userdata)
//                    req.user=userdata;
//                    console.log("req,user \n",req.user)
//                next();
                  
//             //    }
//             // )
//         }
//         )
//             // display.findById({_id:_id})
//             // console.log(userdata);
//         //    req.user=userdata;
//             //    next();
            
//         })

//         // const x=jwt.verify(token,process.env.JWT_URL);
        
        

// }




// asynnc await 

module.exports=  async (req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(4000).json({
            error:"You must logi in -1 authh wala token missing  "

        })}
        try{
            const token=authorization.replace("Bearer ","");
            const userdata= await jwt.verify(token,process.env.JWT_URL);
            if(!userdata){
                console.log(err)
                return res.status(401).json({
                    success: false,
                    message: "Something went wrong while verifying token"
                })

            }
            else{
                const {id}=userdata;
                // console.log("userdata ",userdata);
                display.findById(id).then(e => {
                    
                    // res.status(200).json({
                    //     success: true,
                    // message: "verify user ",
                    // data:userdata
                    // })
                    // console.log(e)
                    console.log("ur are login");
                    req.user=e;
                
                    next();
                })
                
               

               


            }
            
            

        }
        catch(err){
            console.log(err)
            return res.status(401).json({
                success: false,
                message: "Something went wrong while verifying token"
            })

        }
      
        
        

}