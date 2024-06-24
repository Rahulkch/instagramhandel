import React, { useState } from 'react'
import logo from "../images/logo.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
   const [name,setname]=useState("");
   const[username,setusername]=useState("");
   const[email,setemail]=useState("");
   const[password,setpassword]=useState("");
   const n=useNavigate();


//    const email_regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//    sign up function 


const signup=async(req,res)=>{
   console.log("clickedddddd");
   console.log(name,email,username,password);
    /*
    // if(!email_regex.test(email)){
    //     alert("invalid email");
    // }
    // else if(password.length < 5){
    //     alert("pawword must be greater than 5");
    // }

     const x =await  fetch("http://localhost:6000/route/userdetail",{
        method:"Post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            username:username,
            email:email,
            password:password
         })
      }).then(res => res.json())
      .then(data => {
         if(data.error){
            alert(data.error)
         }
         else{
           alert(data.message)
         
         }
      })

   }

   */

   console.log("fetch k uppr tak ");

   fetch("/route/userdetail",{
    method:"Post",
    headers:{
       "Content-Type":"application/json"
    },
    body:JSON.stringify({
       name:name,
       username:username,
       email:email,
       password:password
    })
 }).then(res => res.json())
 .then(data => {
   console.log(data)
   alert("sign up succesfully")
   n("/signin")
 }).catch(e => alert("unable to sign up"))

}



  return (
    <div className='bg-red-200 w-full h-screen flex justify-center items-center flex-col '>
    
        <div  id="box 1" className=" bg-white w-96 px-8 py-10 ">

            <div className='w-full flex justify-center items-center ' >
                <img className='w-32' src={logo} alt="instagram"/>
                
            </div>
            <div>
            <p className='text-l text-center font-semibold text-gray-400 mt-1'>Sign up to placeholder see Photo and video from your friend
        </p>
            </div>

        <div className=' mt-3'>
            <input className=' w-full border-2 border-gray-500 p-2 rounded-lg' type="text" placeholder='name' onChange={(e)=>setname(e.target.value)}></input>
        </div>
        <div className=' mt-3'>
            <input className=' w-full border-2 border-gray-500 p-2 rounded-lg' type="text" placeholder='username' onChange={(e)=>setusername(e.target.value)}></input>
        </div>
        <div className=' mt-3'>
            <input className=' w-full border-2 border-gray-500 p-2 rounded-lg' type="text" placeholder='email' onChange={(e)=>setemail(e.target.value)}></input>
        </div>
        <div className=' mt-3'>
            <input className=' w-full border-2 border-gray-500 p-2 rounded-lg' type="text" placeholder='password' onChange={(e)=>setpassword(e.target.value)}></input>
        </div>
        <p className='text-l text-center font-semibold text-gray-400 mt-1'> BY signing up you agree to out term privacy policy and cookies pilocy</p>
        <input className='bg-blue-500 text-white w-full p-2 mt-3' type='submit'onClick={signup} placeholder="sign up" ></input>

        
        </div>


     
           
        <div className='card-two bg-white  w-[28%] mt-5 p-6 flex items-center justify-center rounded-sm'>

<p className=''>Alredy have a account ? <Link to="/signin"> <span className='text-blue-500'>Sign in</span></Link> </p>


        </div>
      
    </div>
  )
}

export default Signup
