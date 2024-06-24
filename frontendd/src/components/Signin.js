import React, { useContext, useState } from 'react'
import logo from "../images/logo.png"
// import axios from "axios";
// useEffect,
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Logincontext } from '../contex/Logincontex';

const Signin = () => {
  const{setuserlogin}=useContext(Logincontext)
    
  const n=useNavigate();

    const[email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const signin=async (req,res) =>{
        // const x=await axios.post("http://localhost:6000/route/login",{
        //     email:email,
        //     password:password
        // })
        console.log("x ka value  yaha tha login wal apge ta");
        fetch("/route/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password

      })

    }).then(res => res.json())
    .then(data => {
      if (data.error) {
        console.log(data.error)
        alert(" Plse check the password");
      } else {
        alert("Signed In Successfully")
        console.log(data)
        localStorage.setItem("jwt", data.token)
        localStorage.setItem("user",JSON.stringify(data.user));
        
        setuserlogin(true);
        n("/");
       

       
      }
      console.log(data)
    })
  }
  return (
    <div className='w-full h-screen bg-red-200 flex flex-col justify-center items-center' >
    <div className=' bg-white  w-[24%] px-10 py-14 flex flex-col items-center'  id="card-one ">
        <div className='w-full flex justify-center '>
        <img className='w-28' src={logo} alt="phott"/>
        </div>
      
        <div className='  mt-3'>
            <input className='w-full border-2 border-gray-500 p-2 rounded-lg' type="text" placeholder='email' onChange={(e) => setemail(e.target.value)}></input>
        </div>
        <div className=' mt-3'>
            <input className=' w-full border-2 border-gray-500 p-2 rounded-lg' type="text" placeholder='password' onChange={(e)=>setpassword(e.target.value)}></input>
        </div>

        <input className='bg-blue-500 text-white w-full p-2 mt-3' type='submit' onClick={signin}></input>

    </div>

    <div className='card-two bg-white  w-[24%] mt-5 p-7'>
  <p>Do You have an account ? <Link to="/signup"> <span className='text-blue-500'> Sign up</span></Link></p>
    </div>
    </div>
  )
}

export default Signin
