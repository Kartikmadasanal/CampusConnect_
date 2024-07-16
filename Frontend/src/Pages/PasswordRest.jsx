import { Button, Checkbox, Label, TextInput, Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useParams } from 'react-router-dom';
import { GiFeather } from "react-icons/gi"; 
import { useEffect, useState } from "react"
import axios from "axios";
import { URL } from "../url";

function PasswordReset() {

    const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `${URL}/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		// console.log(password)
		e.preventDefault();
		try {
			const res = await axios.post(url, { password });
			// console.log(res)
			setMsg(res.data.message);
			setError("");
			// window.location = "/login";
			navigate("/login");

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

 
    {validUrl ? (
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
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>Add New Password</h1>

        <form className="flex  justify-center  p-3 w-full flex-col gap-4" onSubmit={handleSubmit}>
        <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" name="password" placeholder="********" required onChange={(e) => setPassword(e.target.value)}
							value={password}  />
          </div>
          
          <Button type="submit">Submit</Button>
          {error && <h3 className="text-red-500 text-sm ">{error}</h3>}
          {msg && <h3 className="text-green-500 text-sm ">{msg}</h3>}

          
        </form>
      </div>

    </div>
    ):(<div><h1>404 Not Found </h1></div>)}
    </div>
  );
}

export default PasswordReset

