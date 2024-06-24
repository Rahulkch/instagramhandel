import React, { useEffect, useState } from 'react'
import "./style/home.css"

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Copycomment from './Copycomment';
const Home = () => {
  const [data,setdata]=useState([]);
  const navigate = useNavigate();
  const [comment,setcomment]=useState("");
  const[show,setshow]=useState(false)

  const [item, setItem] = useState([]);
// toggle coment 
const togglecomment=(e)=>{
  if(show){
    setshow(false);
  }
  else{
    setshow(true)
    setItem(e)
  }
}


//.................................... like post 
const likepost=(id)=>{
  console.log("clicked",id);
  fetch("/route/like",{
    method:"put",
    headers:{
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body:JSON.stringify({
      postId:id
    }),
  }).then((res)=>res.json())
  .then((result)=>{
    const newdata=data.map((item) =>{
      if(item._id === result._id){
        return result;
      }
      else{
        return item;
      }
    }
    
  )
  setdata(newdata)
    console.log("like buttom click kree k bad",result);
  }).catch(e=>console.log("eroor like btm k baa",e))
}

// ........................................unlike post 
const unlikepost=(id)=>{
  console.log("clicked",id);
  fetch("/route/unlike",{
    method:"put",
    headers:{
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body:JSON.stringify({
      postId:id
    }),
  }).then((res)=>res.json())
  .then((result)=>{
    const newdata=data.map((item) =>{
      if(item._id === result._id){
        return result;
      }
      else{
        return item;
      }
    }
    
  )
  setdata(newdata)
    
  }).catch(e=>console.log("eroor like btm k baa",e))
}


// comment functionnnn
const makecomment=(text,id)=>{
  if(text === "")return alert("plse add somee comment's")
  fetch("/route/comment",{
   method:"put",
   headers:{
    'Content-Type':"application/json",
    Authorization:"Bearer "+localStorage.getItem("jwt"),
   },
   body: JSON.stringify({
    text: text,
    postId: id
   })
  }).then((res) => res.json())
   .then((result) => {
     const newData = data.map((posts) => {
       if (posts._id === result._id) {
         return result;
       } else {
         return posts;
       }
     });
     setdata(newData);
     setcomment("");
     alert("Comment posted");
     console.log(result);
     
    })
}







// ....................................use effect  use effect
useEffect( () =>{

  const towken=localStorage.getItem("jwt");
  // console.log("value of towken ",towken);
  if(!towken){
    navigate("/signin");
  }

  fetch("/route/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdata(result);
      
      
      })
      .catch((err) => console.log(err));

},[])


  return (
    <div className='home page'>
      {data?.map((e,ind)=>{
        return<div key={ind} className="card">
        <div className='card-header'>
          <div className='card-pic '>
            <img src="https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.jpg?s=1024x1024&w=is&k=20&c=9eszAhNKMRzMHVp4wlmFRak8YyH3rAU8re9HjKA6h3A=" alt=""/>
          </div>
          <Link to={`/profile/${e.postedby._id}`}>
          
          <h5>
            {e.postedby.name}
          </h5>
          </Link>
  
        </div>
        {/* card iamge  */}
        <div className="card-image">
          <img src={e.photos} alt=""></img>
  
        </div>
  
        {/* card content */}
        <div className='card-content'>
        <p className='font-semibold'>{e.body}</p>
          {e.likes.includes(JSON.parse(localStorage.getItem("user"))._id
        )?(
         < span className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={()=>{
                    unlikepost(e._id)
                  }}
                  >favorite</span>
        ):
        <span className="material-symbols-outlined"
        onClick={()=>{
         likepost(e._id)
       }}    
           >favorite</span>}
          
        
    
    <p className='font-semibold'>{e.likes.length} Likes</p>
    <p>i dont know</p>
    <p className='font-xl'

style={{ fontWeight: "bold", cursor: "pointer" }}
onClick={() => {
  togglecomment(e);
}}
    >View all comments</p>
  
        </div>
  
  
  {/* add comments  */}
  
  <div className='add-comment'>
  <span className="material-symbols-outlined">mood</span>
  <input type='text' placeholder='Add a comments' 
  onChange={(e)=>setcomment(e.target.value)}></input>
  <button className='comment'
  onClick={() => {
    makecomment(comment, e._id);
    
  }}
  
  >Post</button>
  </div>
       </div>

      })}


      {/*...............................the commnet page is stating from here  */}
      {/* {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photos} alt="" />
            </div>
            <div className="details">
             
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <h5>{item.postedby.name}</h5>
              </div>

             
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
               {item.comments.map((c) =>{
                return(
                  <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {c.postedby.name} {" "}
                      </span>
                      <span className="commentText">{c.comment}</span>
                    </p>

                )
               })}
                    
                  
                
              </div>

             
              <div className="card-content">
                <p> {item.likes.length}Likes</p>
                <p>{item.body}</p>
              </div>

             
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makecomment(comment,item._id);
                    togglecomment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              togglecomment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )} */}
      {show &&<Copycomment item={item} togglecomment={togglecomment} makecomment={makecomment} />}
*/
     
    </div>



    
  )
}


export default Home
