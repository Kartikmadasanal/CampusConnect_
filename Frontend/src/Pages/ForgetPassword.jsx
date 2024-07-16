import { Button, Checkbox, Label, TextInput, Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';
import { GiFeather } from "react-icons/gi"; 
import { useState } from "react"
import axios from "axios";
import { URL } from "../url";

function ForgetPasword() {



    const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(URL+"/api/password-reset", { email });
			setMsg(res.data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};


  



  return (
    <div>
      <Navbar className='border-b-2 dark:bg-[#121212] '>

        <div
          className='self-center flex  whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        >
          <GiFeather /> <span className='py-1  rounded-lg text-red font-sans '>
            CampusConnect
          </span>
        </div>


    
      </Navbar>


      <div className=' min-h-screen mt-20 mx-auto  max-w-lg'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>Forgot Password</h1>

        <form className="flex  justify-center  p-3 w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" name="email" placeholder="Your email" required  onChange={(e) => setEmail(e.target.value)}/>
          </div>
          
          <Button type="submit">Submit</Button>
          {error && <h3 className="text-red-500 text-sm ">{error}</h3>}
          {msg && <h3 className="text-green-500 text-sm ">{msg}</h3>}

          
        </form>
      </div>

    </div>
  );
}

export default ForgetPasword

