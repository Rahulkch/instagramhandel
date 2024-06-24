const display=require("../model/first");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();

// sign up function
exports.signup=async (req,res)=>{
    console.log("you are in ");
    try{
        console.log("you are in ");
        const {name,email,username,password}=req.body;
    //    checkin for all input detail
        if(!name||!email||!username||!password){
            return res.status(422).json({
                error:"plse enter all the detail"
            })
        }
        // checking length of the password 
      
        
 

        // checking if  user alredy resister with same email or username
        const ema_il=await display.findOne({email:email});
        const user_name=await display.findOne({username:username});
  
        if(ema_il){
   return res.status(422).json({
        error:"email alredy exit ",
        
    })
    
   }

   if(user_name){
    return res.status(422).json({
         error:"Plse change the user name ",
         
     })
     
    }



let hash;
try{
    hash=await bcrypt.hash(password,10)
}catch(err){
    return res.status(500).json({
        success:false,
        message:"error in hasing error"
    });

}



    //    saving the data
        const response=await display.create({
            name,email,username,password:hash});
 return res.status(200).json({
    success:true,
    data:response,
    meassage:"enter data succesfully"
  })

    }

    // handeling error part 
    catch(err){
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"Error while registering ",
            message:"err.message",
        })
    }
}



// login function ..................................................

exports.login=async(req,res)=>{
    try{
        console.log("yaha tak to thik hia ");
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"please fill all the detail"
            })
        }
        // check if email is register or not 
        let user=await display.findOne({email:email});
        // console.log("user k value",user);
        if(!user){
            return res.status(401).json({
                success:false,
                error:"user is not register",
            });
        }
        const payload={
            email:user.email,
            id:user._id,
            username:user.username,
            name:user.name
        }
        // verify the password
        console.log("yaa tak this hai");
        if(await bcrypt.compare(password,user.password)){
            // paswword mathch
           console.log("password match")
            let token=jwt.sign(payload,process.env.JWT_URL,{
                expiresIn:"2h",
               
        })
        console.log("yaha tak to thik hia ");
        const {_id,name,username,email}=user;
        return res.status(200).json({
            token,
            user:{_id,name,email,username},
            message:"login succesfull"

        })
        

        }
        else{
            return res.status(400).json({
                error:"password incorect"
            })
        }
        

    }
    catch(e){
        console.log("reason for error",e);
        return res.status(500).json({
            success:false,
          
            meassage:'Login fail! plse try again',
        })
       }

}