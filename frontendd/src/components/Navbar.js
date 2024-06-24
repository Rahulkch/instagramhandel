import React ,{useContext} from 'react'
import logo from "../images/logo.png"
import { Link } from 'react-router-dom'
import { Logincontext } from '../contex/Logincontex'

const Navbar = ({login}) => {

  const{setlogout}=useContext(Logincontext)

  const towken=localStorage.getItem("jwt");
console.log("login k value ",login);
    const loginstatus=() =>{
      if(towken)login=true;
      if(!towken || login === false){
        return <>
         <Link to="/signin">
              <li>Sign in</li>
              </Link>
              <Link to="/signup">
              <li>Sign up</li>
              </Link>
        </>
      }
      else{
        return[
          <>
           <Link to="/profile">
              <li key="1">Profile</li>
              </Link>
              <Link to="/">
              <li key="3">Home</li>
              </Link>
              <Link to="/createpost">
              <li key="2">Create post</li>
              </Link>
              <Link to={""}>
              <buttom className="text-red-500"
              onClick={()=>{
                console.log("logout value from navbar clicked")
                setlogout(true)}}
              >
                Log out</buttom>
              </Link>

          </>
        ]
      }
      
    }
    
  return (
    <div className='nav-menu  w-full h-24 bg-zinc-300 text-black '>
      
      <div className='px-3 py-6  flex justify-evenly ' >
         <div className='w-32'>
            <img src={logo}  alt="instagrap"></img>
         </div>
         <div className='w-3/5 '>
            <ul className='flex font-semibold text-2xl  justify-evenly '>
             
                {loginstatus()}
               
             
               
            </ul>
         </div>

      </div>
    </div>
  )
}

export default Navbar
