import axios from 'axios';
import { useSelector } from 'react-redux'

import { URL } from '../url';


function Comment({ c, post }) {
    const { currentUser } = useSelector((state) => state.user);

    const deleteComment = async (id) => {
        try {
            await axios.delete(`${URL}/api/comments/${id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                withCredentials: true
              });
              
            window.location.reload(true)
        }
        catch (err) {
            console.log(err)
        }
    }


    return (

        <div>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-xs truncate'>
                    @{c.author}
                </span>
                <div className="flex space-x-2 text-sm">
                    <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
                    <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
                </div>
            </div>
            <p className='text-gray-500 pb-2'>{c.comment}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>



                {currentUser?._id === c?.userId ?
                    <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer" onClick={() => deleteComment(c._id)}>Delete</p>
                    </div> : ""}

            </div>
        </div>

    );
}

export default Comment;