import { Modal, Table, Button, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { AiOutlineSearch } from "react-icons/ai"

import axios from 'axios';
import { URL } from '../url';
import app from '../Firebase';
import {
    getStorage,
    ref,
    deleteObject
} from 'firebase/storage';




export default function DashPosts() {
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [prompt,setPrompt] = useState("")


  useEffect(() => {
    
    
      fetchPosts();
    
  }, []);



  const fetchPosts = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await axios.get(URL + "/api/posts/"+`?search=${prompt}` )
      
        setUserPosts(res.data.posts);
       
      
    } catch (error) {
      console.log(error.message);
    }
  };
 



  const handleDeletePost = async () => {

    try {
      if(userPosts.photo){

        const storage = getStorage(app);
        const storageRef = ref(storage, userPosts.photo);
        await deleteObject(storageRef)
      }

        const res = await axios.delete(URL + "/api/posts/" + postIdToDelete, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            withCredentials: true
          })
        // console.log(res.data)
        setShowModal(false);

        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete))

    }
    catch (err) {
        console.log(err)
    }

}





  return (
    
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    <form  onSubmit={fetchPosts}>
     
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='w-28 lg:w-full mb-2 '
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        
      </form>
      
      {userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>author</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className='divide-y' key={post._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/post/${post._id}`}>
                      <img
                        src={post.photo}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/posts/post/${post._id}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.username}</Table.Cell>
                  <Table.Cell>{post.categorie}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <p 
                      className='text-teal-500 hover:underline cursor-pointer'
                      onClick={() => navigate("/edit/" + post._id)}
                    >
                      <span>Edit</span>
                    </p>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
