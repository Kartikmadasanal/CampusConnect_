import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';

export default function DashboardComp() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
      fetchUsers();
      fetchPosts();
      fetchComments();
    
  }, []);




  const fetchUsers = async () => {
    try {
      const res = await axios.get(URL+`/api/users/`);
      setTotalUsers(res.data.totalUsers);
     
      
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/")
      setTotalPosts(res.data.totalPosts);      
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchComments = async () => {
    try {
      const res = await axios.get(URL+'/api/comments/');
        setTotalComments(res.data.totalComments);
        
    } catch (error) {
      console.log(error.message);
    }
  };
  



  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Comments
              </h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          
        </div>
      </div>
    
    </div>
  );
}
