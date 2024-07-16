import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../Components/Header';
import FooterBar from '../Components/Footer';
import axios from 'axios';
import {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '../url';
import categories from '../Categorie/Category';
function Editpost() {


  const postId=useParams().id
  const navigate=useNavigate()
  const [formData, setFormData] = useState({});




  const fetchPost=async()=>{
    try{
      const res=await axios.get(URL+"/api/posts/"+postId)
      // console.log(res.data)
      setFormData(res.data)

    }
    catch(err){
      console.log(err)
    }
  }



  const handleUpdate=async (e)=>{
    e.preventDefault()
    
    try{
      const res=await axios.put(URL+"/api/posts/"+postId,formData,{
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
    }
  }
  
  






  useEffect(()=>{
    fetchPost()
  },[postId])
// console.log(formData)



  return (
    <div>
      <Header/>
  
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
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
            value={formData.title}

           
          />
          <Select
              onChange={(e) =>
                setFormData({ ...formData, categorie: e.target.value })
              }
             
            value={formData.categorie}
            >
             <option value="">Select Category</option>
              {categories.map((item, index) => {
                return (
                  <option key={index} value={item}>{item}</option>

                )
              })}
            </Select>
        </div>
        
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          value={formData.desc}
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, desc: value });
          }}
          
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Edit Post
        </Button>
        
      </form>
    </div>
    <FooterBar/>
    </div>
  );
}

export default Editpost

