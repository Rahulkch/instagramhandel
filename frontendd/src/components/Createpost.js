import React, { useEffect, useState } from 'react'
import "./style/createpost.css"
import { useNavigate } from "react-router-dom";

const Createpost = () => {
    const[body,setbody]=useState("");
    const[image,setimage]=useState("");
    const [url,seturl]=useState("");
const n=useNavigate();

    useEffect(()=>{
      if(url){
        fetch("/route/createpost",{
          method:"post",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
    
          },
          body:JSON.stringify({
            body,
            photos:url
          })
    
        }).then(res=>res.json())
        .then(data =>{
          if(data.error){
            alert("unable to update");
          }else{
            alert("uploaded succesfully");
            n("/")
    
          }
        })

      }
     

    },[url])
    



    //  share buttom click and url is fetchded
const post_detail=()=>{
  const data=new FormData();
  data.append("file",image);
  data.append("upload_preset","insta_clone")
  data.append("cloud_name","dx0lfkfrj")
  fetch("https://api.cloudinary.com/v1_1/dx0lfkfrj/image/upload", {
    method:"post",
    body:data
}).then(res => res.json())
 .then((data) =>{
  seturl(data.url)
 } )
 .catch(error => console.log(error))
 console.log();

}









  const loadfile = (event) => {
    var output = document.getElementById("output");
    console.log("upload documents",event.target.files[0]);
    console.log("url hai ye wala ",URL.createObjectURL(event.target.files[0]))
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };



}
  return (

  
  
  
    <div className="createPost">
        <h2>this is page</h2>
    {/* //header */}
    <div className="post-header ">
      <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
      <button id="post-btn" onClick={post_detail} >Share</button>
    </div>
    {/* image preview */}
    <div className="main-div">
      <img
        id="output"
        src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
      alt=""
      />
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
            loadfile(event);
            setimage(event.target.files[0]);
            
          }}
       
      />
    </div>
    {/* details */}
    <div className="details">
      <div className="card-header">
        <div className="card-pic">
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <h5>Ramesh</h5>
      </div>
      <textarea value={body} type="text" placeholder="Write a caption...." onChange={(e) => setbody(e.target.value)}></textarea>
    </div>
  </div>

        )
}


export default Createpost
