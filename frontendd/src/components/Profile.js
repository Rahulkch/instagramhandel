import React, { useEffect,useState } from 'react'
import "./style/profile.css"
import Postdetails from "./Postdetails"
const Profile = () => {

  const [pic,setpic] = useState([]);
  const [user,setuser] = useState([]);
  const[details,setdetails]=useState([]);
   const[showdetails,setshowdetails]=useState(false);
const toggledetails=(post)=>{
  if(showdetails){
    setshowdetails(false);
  }
  else{
    setdetails(post);
    setshowdetails(true);
    console.log(showdetails,"ab to deka dena chaiye");
    

  }
}
  

  useEffect(() =>{
    fetch(`/route/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
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
  },[])


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
        <h1>{user.name}</h1>
        <div className="profile-info" style={{ display: "flex" }}>
          <p>{pic.length}  posts</p>
          <p>34 followers</p>
          <p>34 following</p>
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
      <img className='item' src={link.photos} alt=" " 
      onClick={() =>{
         toggledetails(link)
      }} 
      />
      
      
    )
      })}

      {showdetails && <Postdetails item={details} toggledetails={toggledetails}/>}

      
    </div>
   
  </div>
  )
}

export default Profile
