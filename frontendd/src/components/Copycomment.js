import React, { useState } from 'react'

const Copycomment = ({item,togglecomment,makecomment}) => {
    const[comment,setcomment]=useState("")
  return (
    <div>
             
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photos} alt="" />
            </div>
            <div className="details">
              {/* card header */}
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

              {/* commentSection */}
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

              {/* card content */}
              <div className="card-content">
                <p> {item.likes.length}Likes</p>
                <p>{item.body}</p>
              </div>

              {/* add Comment */}
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
      
      
    </div>
  )
}

export default Copycomment
