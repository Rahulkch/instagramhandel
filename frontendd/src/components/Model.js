import React ,{useContext}from 'react'
import './style/model.css'
import { RiCloseLine } from "react-icons/ri";
import { Logincontext } from '../contex/Logincontex';
import { useNavigate } from "react-router-dom";

const Model = () => {
const {setlogout}=useContext(Logincontext)
const navigate = useNavigate();


return (
    <div className="darkBg"
    onClick={()=>setlogout(false)} 
    >
    <div className="centered">
      <div className="modal">
        {/* modal header */}
        <div className="modalHeader">
          <h5 className="heading">Confirm</h5>
        </div>
        <button className="closeBtn" >
          <RiCloseLine></RiCloseLine>
        </button>
        {/* modal content */}
        <div className="modalContent">Are you really want to log Out ?</div>
        <div className="modalActions">
          <div className="actionsContainer">
            <button
            onClick={() =>{
              setlogout(false);
              localStorage.clear();
              navigate("/signin")
              
            }}
             className='logOutBtn '
            >
              Log Out
            </button>

            <button className="cancelBtn"
             onClick={()=>setlogout(false)}
             >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Model
