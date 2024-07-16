
import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { HiEnvelope } from "react-icons/hi2";
import FooterBar from "../Components/Footer";
import Header from "../Components/Header";
import Loader from "../Components/Lodear";
import axios from "axios";
import { URL } from "../url";

function Contact() {

  const [formData, setformData] = useState({
    email:"",
    subject: "",
    message: ""
  })
  const [error, setError] = useState(false)
  const [msg, setmsg] = useState("")
  const[loader,setLoader] = useState(false)

  const handelsubmit = async(e)=>{
    setLoader(true)
    e.preventDefault()
    try {
      const res = await axios.post(URL+"/api/sendmessage/",formData)
      setLoader(false)
      setmsg(res.data.message)

    } catch (error) {
      setLoader(false)
      setError(true)
      console.log(error)      
    }
 

  }

  return (
    <div>
      <Header />

      <div className="max-w-lg mx-auto min-h-svh mt-24 p-3 w-full">

        <form action="submit" onSubmit={handelsubmit} >
        <div className="mb-6 mt-3">
            <Label htmlFor="email" className="mb-2 block" >
              Your email
            </Label>
            <TextInput id="email" name="email" placeholder="Your_gmail@.com" type="email" required onChange={(e) => setformData({ ...formData, email: e.target.value })} value={formData.email} />
          </div>
          <div className="mb-6">
            <Label htmlFor="subject" className="mb-2 block">
              Subject
            </Label>
            <TextInput id="subject" name="subject" placeholder="Let us know how we can help you" required onChange={(e) => setformData({ ...formData, subject: e.target.value })} value={formData.subject} />
          </div>
          <div className="mb-6">
            <Label htmlFor="message" className="mb-2 block">
              Your message
            </Label>
            <Textarea id="message" name="message" placeholder="Your message..." rows={4} required onChange={(e)=>setformData({...formData, message:e.target.value})} value={formData.message} />
          </div>
          {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
          {msg && <h3 className="text-green-500 text-sm ">{msg}</h3>}
          <div className="mb-6">
          <Button type="submit">
          {loader?<Loader/>:"Send message"}
          
          
          </Button>

          </div>
          
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <a href="mailto:info@company.com" className="hover:underline">
              kartikmadasanal@gmail .com
            </a>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <a href="tel:2124567890" className="hover:underline">
              8867975992
            </a>
          </p>
          
        </form>
      </div>
      <FooterBar />
    </div>

  );
}

export default Contact;