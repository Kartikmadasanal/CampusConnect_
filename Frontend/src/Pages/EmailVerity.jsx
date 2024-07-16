import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";

 function EmailVerify() {
    const [validUrl,setValidUrl] = useState(false);
    const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				
				const data  = await axios.get(URL+`/api/auth/${param.id}/verify/${param.token}`);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);


  return (
    <div className="min-h-screen pt-36 mx-auto  max-w-lg">
{validUrl ? (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Verify youe email address
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        In order to start using CampusConnect , you need to confirm your email address
      </p>
      <Button >
      <Link to={"/login"}>

        Verify Email Address
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      </Button>
    </Card>
):(<div><h1>404 Not Found </h1></div>)}
    </div>

  );
}

export default EmailVerify