const postschema=require("../model/second")


exports.upload=async(req,res)=>{
    try{
        
        

        const {body,photos}=req.body;
        if(!body || !photos){
            return res.status(444).json({error:"plse filled all the detail"});
    
        }
        
       
        const post= new postschema({
            body,
            photos,
            postedby:req.user

        })
        const x=await post.save();
        console.log(req.user);
        console.log("it is update functoin");
       
       
        // console.log("it is update functoin2222");
        // console.log(post);
        res.status(200).json({
            message:"uploaded successfully",
            data:x
        })
        // console.log(req.user);
        // res.json("ok")
        // post.save().then((result) =>{
        //     return res.json({
        //         message:"uploaded succesfuly",
        //       post:result
        //     })
        //  }).catch((error) => {return res.json({
        //     s:"false",
        //     message:error})})



    }
    catch(error){
        console.log("eroor while entering the data ");
        res.status(500).json({
            sucess:false,
            error:"unable to upload file",
            message:error
        })

    }
    
   

}
exports.getallpost=async(req,res)=>{
    try{
        // const x=await postschema.find({});
        // // response
        // const y=await x.populate("postedby");
        // res.status(200).json({
        //     success: true,
        //     data: y
            
        //   });
        postschema.find()
        .populate("postedby","_id name")
        .then(posts => res.json(posts))
   .catch(err => console.log(err));


    }catch(err){
        console.error(err);
    res.status(500).json({
         success: false,
      error: err.message,
      message: "Server error",
    });
    }
    
    


}

exports.like=(req,res)=>{
    postschema.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new :true
    }).populate("postedby","_id name ")
    .then((data,err)=>{
        if(data){
            return res.status(200).json({data:data})
        }else{
            res.json(err);
        }
    })
}
exports.unlike=(req,res)=>{
    postschema.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    }).then((data,err)=>{
        if(data){
            return res.status(200).json({data:data})

        }else{
            res.json(err);
        }
    })
}

exports.comment=(req,res)=>{
    const comm={
        comment:req.body.text,
        postedby:req.user._id
    }
    postschema.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comm}
    },{
        new:true
    }).populate("comments.postedby","_id name")
    .populate("postedby","_id name")
    .then((data,err) =>{
        if (data) {
            return res.status(200).json({ data: data})
        } else {
            res.status(422).json({err:err})
        }
    })
}
