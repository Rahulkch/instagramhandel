import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style/profile.css"


export default function UserProfie() {
  const { userid } = useParams();
  const [pic,setpic] = useState([]);
  const [user,setuser] = useState([]);
  const[isfollow,setisfollow]=useState(false)


  // to follow user

  const followuser=(userId)=>{
    fetch("/route/follow",{
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }), 
    })
    .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setisfollow(true)
        
      });
  }


  // to unfollow user
  const unfollowuser=(userId)=>{
    fetch("/route/unfollow",{
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }), 
    })
    .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setisfollow(false);
        
      });
  }

  useEffect(() => {
    fetch(`/route/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.post)
        setpic(result.post);
        setuser(result.user)
        
      });
  }, []);

  return (
    <div className="profile">
    {/* Profile frame */}
    <div className="profile-frame">
      {/* profile-pic */}
      <div className="profile-pic">
        <img
          
          src="https://media.istockphoto.com/id/936408270/photo/beautiful-book-lover.jpg?s=1024x1024&w=is&k=20&c=v1tLVAvNwdpNUfpyMetjVv7en4EI35u6ZJKbkMB2dIc="
          alt=""
        />
      </div>
      {/* profile-data */}
      <div className="pofile-data">
        <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
        <h1>{user.name}</h1>
        <button 
        onClick={() => {
          if(isfollow){
              unfollowuser(user._id)
          }
          else{
            followuser(user._id);
          }
          
          }}
        className="followBtn">{isfollow?"Unfollow":"Follow"}</button>
            
        </div>
        
        <div className="profile-info" style={{ display: "flex" }}>
          <p>{pic.length}  posts</p>
          <p>{user.following.length} followers</p>
          <p>{user.followers.length} following</p>
        </div>
      </div>
    </div>
    <hr
      style={{
        width: "90%",

        opacity: "0.8",
        margin: "25px auto",
      }}
    />
    {/* Gallery */}
    <div className="gallery">
      {/* {pic.map((pics) => {
        return <img key={pics._id} src={pics.photo}
          onClick={() => {
            toggleDetails(pics)
          }}
          className="item"></img>;
      })} */}
      {pic?.map((link,ind) =>{
        return(
      <img className='item' src={link.photos} alt=" " />
        )
      })}

      
    </div>
   
  </div>
  )
}


