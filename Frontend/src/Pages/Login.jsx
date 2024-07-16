import { Button, Label, TextInput, Navbar } from "flowbite-react";
import FooterBar from "../Components/Footer";
import { Link } from 'react-router-dom';
import { GiFeather } from "react-icons/gi";
import { useState } from "react"
import axios from "axios";
import { URL } from "../url";
import { useDispatch } from 'react-redux';
import {
  signInSuccess,
} from '../redux/user/userSlice';

function Login() {

  const [error, setError] = useState(false)
  const [errormessage, setErrormessage] = useState("")
  const dispatch = useDispatch();


  const [Userdata, setUserdata] = useState({
    email: "",
    password: ""
  });

  function handleChange(event) {

    const { name, value } = event.target;

    setUserdata(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post(URL + "/api/auth/login", Userdata, { withCredentials: true })
      console.log(res.data.user)
      dispatch(signInSuccess(res.data.user));
      localStorage.setItem("token", res.data.data);


      window.location = "/";
    }
    catch (err) {
      setError(true)
      console.log(err)
      setErrormessage(err.response.data)


    }

  }










  return (
    <div>
      <Navbar className='border-b-2 dark:bg-[#121212] '>

        <div
          className='self-center flex  whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        >
          <GiFeather />          <span className='py-1  rounded-lg text-red font-sans '>
            CampusConnect
          </span>
        </div>


        <div className='flex gap-2 md:order-2 flex-end'>



          <Navbar.Collapse>

            <Navbar.Link as={'div'}>
              <Link to='/signin'>Register</Link>
            </Navbar.Link>

          </Navbar.Collapse>
        </div>
      </Navbar>


      <div className=' min-h-screen mt-20 mx-auto  max-w-lg'>

        <form className="flex  justify-center  p-3 w-full flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" name="email" placeholder="Your email" required onChange={handleChange} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" name="password" placeholder="********" required onChange={handleChange} />
          </div>
          <Button type="submit">Login</Button>
          <Link to="/forgot-password">
            <p >Forgot Password ?</p>
          </Link>
          {error && <h3 className="text-red-500 text-sm ">{errormessage}</h3>}

          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
        </form>
      </div>

      <FooterBar />
    </div>
  );
}

export default Login

