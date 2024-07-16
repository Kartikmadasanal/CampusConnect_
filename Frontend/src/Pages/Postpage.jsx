import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Comment from '../Components/Comment';
import { Button, Textarea } from 'flowbite-react';
import Header from '../Components/Header';
import FooterBar from '../Components/Footer';
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import axios from 'axios';
import { URL } from '../url';
import app from '../Firebase';
import {
    getStorage,
    ref,
    deleteObject
} from 'firebase/storage';
import { useSelector,  } from 'react-redux'


function Postpage() {

    const { currentUser } = useSelector((state) => state.user);
    const postId = useParams().id
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()


    const fetchPost = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/" + postId)
            setPost(res.data)
            //   console.log(res.data)

        }
        catch (err) {
            console.log(err)
        }
    }



    const handleDeletePost = async () => {

        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, post.photo);
            await deleteObject(storageRef)

            const res = await axios.delete(URL + "/api/posts/" + postId, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                withCredentials: true
              })
            // console.log(res.data)

            navigate("/")

        }
        catch (err) {
            console.log(err)
        }

    }


    useEffect(() => {
        fetchPost()
        // console.log(post)
    }, [postId])





    const fetchPostComments = async () => {
        setLoader(true)
        try {
            const res = await axios.get(URL + "/api/comments/post/" + postId)
            setComments(res.data)
            setLoader(false)

        }
        catch (err) {
            setLoader(true)
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPostComments()

    }, [postId])


    const postComment = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${URL}/api/comments/create`,
                {
                  comment: comment,
                  author: currentUser.username,
                  postId: postId,
                  userId: currentUser._id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  withCredentials: true,
                }
              );
              

            // fetchPostComments()
            // setComment("")
            window.location.reload(true)

        }
        catch (err) {
            console.log(err)
        }

    }



    return (
        <div>
            <Header />

            <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>


                <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                    {post.title}
                </h1>
                <h1 className='self-center mt-5 px-4 py-[6px] shadow-md rounded-full ' pill='true'>
                    {post.categorie}
                </h1>
                <div className="flex justify-between items-center">
                    {currentUser?._id === post?.userId && <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer" onClick={() => navigate("/edit/" + postId)} ><BiEdit /></p>
                        <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete /></p>
                    </div>}
                </div>
                <img
                    src={post.photo}
                    alt={post && post.title}
                    className='mt-10 p-3 max-h-[600px] w-full object-cover'
                />
                <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                    <div className="flex space-x-2 text-sm">
                        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                    </div><p>@{post.username}</p>
                </div>

                <div
                    className='p-3 max-w-2xl mx-auto w-full post-content'
                    dangerouslySetInnerHTML={{ __html: post && post.desc }}
                ></div>
                <div className='flexp-4 border-b dark:border-gray-600 text-sm'>
                    <div className='flex-1'>
                        <div className='flex items-center mb-1'>
                            <span className='font-bold mr-1 text-xs truncate'>
                            Signed in as: @{currentUser.username}
                            </span>
                        </div>
                        <div>
                            <Textarea
                                className='mb-2'

                                placeholder='Add acomment...'
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div className='flex justify-end gap-2 text-xs'>
                                <Button
                                    type='button'
                                    size='sm'
                                    onClick={postComment}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                        {comments?.map((c) => (
                            <Comment key={c._id} c={c} post={post} />
                        ))}
                    </div>


                </div>

            </main>
            <FooterBar />
        </div>
    );

}

export default Postpage 