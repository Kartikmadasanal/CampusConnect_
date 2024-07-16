/* eslint-disable react/prop-types */


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

import { useDispatch, useSelector } from 'react-redux';
import {
  signInSuccess,
  signoutSuccess,
} from '../redux/user/userSlice';


export const UserContext=createContext({})


export  function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    const dispatch = useDispatch();


    useEffect(()=>{
      getUser()
   },[])
  
    
    const  getUser = async () => {
     
     try {
         const res = await axios.get(URL + "/api/auth/refetch/"+localStorage.getItem("token"));
         dispatch(signInSuccess(res.data));
         console.log("Response data:", res.data); // Check what data is received
     } catch (err) {
      dispatch(signoutSuccess());
         console.error("Error fetching user:", err);
  
     }
  };
  
 
    return (<UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>)
}

