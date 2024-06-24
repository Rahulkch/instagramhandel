
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Home from './components/Home';
import Profile from './components/Profile';
import Createpost from './components/Createpost';
import Model from './components/Model';
import { useState } from 'react';
import { Logincontext } from './contex/Logincontex';
import UserProfie from './components/Userprofile';

function App() {

  const [userlogin,setuserlogin]=useState(false);
  const [logout,setlogout]=useState(false)
  console.log("logout value from app.js",logout)
  return (
    <div className="">
  <Logincontext.Provider value={{setuserlogin,setlogout}}>
     <Navbar login={userlogin}/>

     <Routes>
      <Route path="/" element={<Home login={setuserlogin}></Home>}/>
      <Route path="/signin"  element={<Signin/>}/>
      <Route path="/signup" element={<Signup></Signup>}/>
      <Route exact path="/profile" element={<Profile/>}/>
      <Route  path="/profile/:userid" element={<UserProfie/>}/>

      <Route path="/createpost" element={<Createpost/>}/>
     </Routes>
   {logout && <Model setlogout={setlogout}></Model>}
     </Logincontext.Provider>
    </div>
  );
}

export default App;
