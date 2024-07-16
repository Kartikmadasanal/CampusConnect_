import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import FooterBar from '../Components/Footer'
import PostData from '../Components/PostData'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../url'
import Loader from '../Components/Lodear'
import { useSelector,  } from 'react-redux'




function Myblogs() {
    const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const { currentUser } = useSelector((state) => state.user);

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/user/"+currentUser._id)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])






    return (
        <div>
            <Header />


            <div className="px-4 py-5 md:px-[200px] min-h-[80vh]">

            {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          
          <Link key={post._id}  to={currentUser?`/posts/post/${post._id}`:"/login"}>
          <PostData post={post}/>
          </Link>
          
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}


            </div>
            <FooterBar />
        </div>
    )
}

export default Myblogs
