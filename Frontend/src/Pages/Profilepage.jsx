import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import Header from '../Components/Header';
import FooterBar from '../Components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import Loader from '../Components/Lodear';
import { useSelector, useDispatch } from 'react-redux'
import {
  signoutSuccess,
} from '../redux/user/userSlice';


function Profilepage() {

  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const param = useParams()
  const [updatesdata,setUpdateddata] = useState({})
  const navigate = useNavigate()
  const [userdata, setusedata] = useState({}) 
  const [updated, setUpdated] = useState(false)

  
  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + currentUser._id)

       setusedata(res.data)
      //  console.log(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleUserUpdate=async (event)=>{


    event.preventDefault()
    setUpdated(false)
    try {
      const res = await axios.put(
        `${URL}/api/users/${currentUser._id}`,
        updatesdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      // console.log(res.data);
      setUpdated(true);
    } 
    
    catch(err){
      console.log(err)
      setUpdated(false)
    }
  
  }

  const handleUserDelete = async () => {

    // alert("Are you sure  ?")
    try {
      await axios.delete(URL + "/api/users/" + currentUser._id)
      localStorage.removeItem("user");
      // window.location.reload();
      
      await clearCookie("token",{sameSite:"none",secure:true})
      navigate("/login")
      // console.log(res.data)

    }
    catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      // console.log(res);
      // console.log(user);
      localStorage.removeItem("token");
      dispatch(signoutSuccess())
      navigate("/login");
    } 
  
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    fetchProfile()

  }, [param.id])
// console.log(user)

  if (!currentUser) {

    return <Loader />

  }
  else {


    return (
      <div>
        <Header />
        <div className='max-w-lg mx-auto p-3 w-full min-h-screen'>
          <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
          <form className='flex flex-col gap-4' onSubmit={handleUserUpdate}>


            <TextInput
              type='text'
              id='username'
              placeholder='username'
              defaultValue={userdata.username}
              onChange={(e) =>
                setUpdateddata({ ...updatesdata, username: e.target.value })
              }

            />
            <TextInput
              type='text'
              id='USN'
              placeholder='USN'
              value={userdata.usn}

            />
            <TextInput
              type='email'
              id='email'
              placeholder='email'
              value={userdata.email}

            />
            <TextInput
              type='password'
              id='password'
              placeholder='password'
              onChange={(e) =>
                setUpdateddata({ ...updatesdata, password: e.target.value })
              }
            />
            <Button
              type='submit'
              gradientDuoTone='purpleToBlue'
              outline
            >Update
            </Button>
          </form>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}

          <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer' onClick={handleUserDelete} >
              Delete Account
            </span>
            <span className='cursor-pointer' onClick={handleLogout}>
              Sign Out
            </span>
          </div>

        </div>


        <FooterBar />
      </div>
    )
  }
}

export default Profilepage
