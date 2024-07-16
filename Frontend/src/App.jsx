import React from "react"
import {  Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Aboutus from "./Pages/Aboutus"
import Login from "./Pages/Login"
import Signin from "./Pages/Signin"
import Contact from "./Pages/Contact"
import Profilepage from "./Pages/Profilepage"
import Createpost from "./Pages/Createpost"
import Postpage from "./Pages/Postpage"
import Myblogs from "./Pages/Myblogs"
import Editpost from "./Pages/Editpost"
import EmailVerify from "./Pages/EmailVerity"
import ForgetPasword from "./Pages/ForgetPassword"
import PasswordReset from "./Pages/PasswordRest"
import { useSelector, useDispatch } from 'react-redux'
import { UserContextProvider } from './context/UserContext.jsx'



export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>

      <UserContextProvider>
<>
  
      <Routes>
      {currentUser && <Route path="/" element={<Home/>}/>}
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/Login" element={<Login/> }/>
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route path="/Signin" element={<Signin/> }/>
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/createpost" element={<Createpost/>}/>
        <Route path="/profile/:id" element={<Profilepage/>}/>
        <Route path="/posts/post/:id" element={<Postpage/>}/>
        <Route path="/edit/:id" element={<Editpost/>}/>
        <Route path="/myblogs/:id" element={<Myblogs/>}/>
        <Route path="/forgot-password" element={<ForgetPasword/>} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset/>} />
      </Routes>
      

</>
      </UserContextProvider>


    </BrowserRouter>
  )     

}



