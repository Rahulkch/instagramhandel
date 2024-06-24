const postschema=require("../model/second")
const display=require("../model/first");


// fetching post of user
exports.userpost=(req,res)=>{
    console.log("you are in ")
    display.findOne({_id:req.params.id})
    // .select("-password")
    .then(user =>{
        
        console.log("id in profile page",user);
        postschema.find({postedby:req.params.id})
        // .populate("postedby","_id")
        .then((post,err) =>{
            if(post){
              
              return  res.status(200).json({ user, post})
               

            }
            else{
                
                return res.status(422).json({ error: err })

            }

        }).catch(err => {
            
            return res.status(404).json({ error: "User not found" })
        })
    })


}

exports.deletepost=(req,res)=>{
    console.log("you are in ",req.params.postId);
    postschema.findOne({_id:req.params.postId})
    // .populate("postedby ","_id")
     .then((data,err)=>{
        if(err || !data){
            return res.status(422).json({ error: err })

        }
        console.log("1st data",data)
        console.log("requereid",req.user._id);
        if(data.postedby._id.toString() === req.user._id.toString() ){
            data.deleteOne()
            .then(result => {
                return res.json({ message: "Successfully deleted" })
            }).catch((err) => {
                console.log(err)
            })
        }
     })
}

exports.follow=(req,res)=>{
    display.findByIdAndUpdate(req.body.followId,{
   $pus:{followers:req.user._id}
    },{
        new:true
    })
    .then((result,err) =>{
        if(err){
            return res.status(422).json({ error: err })
        }
        display.findByIdAndUpdate(req.user._id,{
            $puh:{following:req.body.followId}
        },{
            new:true
        }).then(result =>{
            res.json(result)
            c
        })
        .catch(err => { return res.status(422).json({ error: err }) })

    })
}
exports.unfollow= async (req,res)=>{
    display.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    }

    ).then((result,err)=>{
        if(err){
            return res.status(422).json({ error: err })
        }
        display.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}

        },{
            new:true
        }).then(result => res.json(result))
        .catch(err => { return res.status(422).json({ error: err }) })
    })
}