const express=require("express");
const path=express.Router();

const middleware=require("../middleware/require")
const {signup}=require("../components/login");
const{dumy}=require("../components/dumy")
const {login}=require("../components/login")

const {upload}=require("../components/posts")
const{getallpost,like,unlike,comment}=require("../components/posts")
const {userpost,deletepost,follow,unfollow}=require("../components/user")



path.post("/userdetail",signup);
path.post("/login",login)
path.get("/dumy",middleware,dumy)
path.post("/createpost",middleware,upload);
path.get("/allpost",getallpost);
path.put("/like",middleware,like);
path.put("/unlike",middleware,unlike);
path.put("/comment",middleware,comment);


// user file 
path.get("/user/:id",userpost )
path.delete("/delete/:postId",middleware,deletepost);
path.put("/follow",middleware,follow)
path.put("/unfollow",middleware,unfollow)



module.exports=path;