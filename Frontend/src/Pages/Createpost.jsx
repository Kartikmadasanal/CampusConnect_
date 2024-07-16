import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../Components/Header';
import FooterBar from '../Components/Footer';
import categories from '../Categorie/Category';
import {useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import Loader from '../Components/Lodear';
import app from '../Firebase';
import { useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from 'firebase/storage';
import axios from 'axios';
import { URL } from '../url';
import { useEffect } from 'react';


function Createpost() {

  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const navigate=useNavigate()
  
useEffect(()=>{
  setFormData({ ...formData, username: currentUser.username, userId:currentUser._id});
},[])

  const handleUpdloadImage = async () => {
    setImageUploadProgress(true)
    const maxSize = 2 * 1024 * 1024; // 2 MB limit

    try {

      if (!file) {
        setImageUploadError('Please select an image');
        setImageUploadProgress(false)

        return;
      }
      if (file.size > maxSize) {
        alert('File size exceeds 2 MB limit.');
        setImageUploadProgress(false)

        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef)
      setFormData({ ...formData, photo: downloadURL });
      // console.log(downloadURL)
      setImageUploadProgress(false)
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
    const res=await axios.post(URL+"/api/posts/create",formData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      withCredentials: true
    })
    navigate("/posts/post/"+res.data._id)
    // console.log(res.data)
  }
  catch(err){
    console.log(err)
    // console.log(formData)
    setPublishError(err.message)
    console.log(publishError)

  }

  };
  // console.log(formData)
  return (

    <div>
      <Header />

      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Title'
              required
              id='title'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, categorie: e.target.value })
              }
            >
             <option value="">Select Category</option>
              {categories.map((item, index) => {
                return (
                  <option key={index} value={item}>{item}</option>

                )
              })}
            </Select>


          </div>
          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}

            />
            <h1 className='font-semibold'>maxSize: 2MB</h1>
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              outline
              onClick={handleUpdloadImage}
            >
              {imageUploadProgress ? <Loader /> : "Upload Image"
              }
            </Button>
          </div>
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
          {formData.photo && (
            <img
              src={formData.photo}
              alt='upload'
              className='w-full h-full object-cover'
            />)
          }

          <ReactQuill
            theme='snow'
            placeholder='Write something...'
            className='h-72 mb-16'
            required
            onChange={(value) => {
            setFormData({ ...formData, desc: value });
          }}
          />
          <Button type='submit' className=' bg-[#BB86FC]'>
            Publish
          </Button>
          {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
      </div>
      <FooterBar />
    </div>

  );
}

export default Createpost;

