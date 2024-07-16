import { Button, Label, TextInput, Navbar } from "flowbite-react";
import FooterBar from "../Components/Footer";
import { Link, useNavigate } from 'react-router-dom';
import { GiFeather } from "react-icons/gi";
import { useState } from "react";
import axios from "axios"
import { URL } from "../url";
import Loader from "../Components/Lodear";
function Signin() {
  // const navigate=useNavigate()
  const [error, setError] = useState(false)
  const [msg, setmsg] = useState("")
  const[loader,setLoader] = useState(false)


  const [Userdata, setUserdata] = useState({
    username: "",
    usn: "",
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
  const handleRegister = async (e) => {
    setLoader(true)
    e.preventDefault();
    try {
      const res = await axios.post(URL + "/api/auth/register", Userdata)
      setUserdata(Userdata)

      setmsg(res.data.Message)
      setLoader(false)
      // console.log(res.data.Message)
      // console.log(res)
      // navigate("/login")



    }
    catch (error) {
      setLoader(false)
      setError(true)
      console.log(error)
    }
  }



  return (
    <div>
      <Navbar className='border-b-2 dark:bg-[#121212]'>

        <div
          to='/'
          className='self-center flex  whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        >
          <GiFeather />          <span className='py-1  rounded-lg text-red font-sans '>
            CampusConnect
          </span>
        </div>


        <div className='flex gap-2 md:order-2 flex-end'>


          <Navbar.Collapse>
            <Navbar.Link as={'div'}>
              <Link to='/login'>Login</Link>
            </Navbar.Link>


          </Navbar.Collapse>
        </div>

      </Navbar>


      <div className=' min-h-screen mt-20 mx-auto  max-w-lg'>

        <form className="flex  justify-center  p-3 w-full flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text" value="Your username" />
            </div>
            <TextInput id="username" name="username" type="text" placeholder="Your username" required onChange={handleChange} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text" value="Your USN" />
            </div>
            <TextInput id="usn" name="usn" type="text" placeholder="Your USN" required onChange={handleChange} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" name="email" type="email" placeholder="Your email" required onChange={handleChange} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" name="password" type="password" placeholder="********" required onChange={handleChange} />
          </div>
          <Button type="submit">
          {loader?<Loader/>:"Register"}
          
          
          </Button>
          {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
          {msg && <h3 className="text-green-500 text-sm ">{msg}</h3>}

          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/login' className='text-blue-500'>
              Sign In
            </Link>
          </div>

        </form>
      </div>

      <FooterBar />
    </div>
  );
}

export default Signin

