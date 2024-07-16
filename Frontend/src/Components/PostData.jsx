import React from 'react';
import Loader from './Lodear';

const PostData = ({ post }) => {
  // Function to extract text content from HTML
  const extractTextFromHTML = (html) => {
    if (!html) return ''; // Handle empty or undefined input

    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
// console.log(post)
  return (
    <div className="w-full flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4 shadow-lg rounded-lg border dark:border-[#1F1A24] dark:bg-[#121212]">
      {/* left (image) */}
      <div className="w-full md:w-[35%] h-[200px] flex justify-center items-center">
        <img src={post.photo} alt={post.title || 'Post Image'} className="h-full w-full object-cover" />
      </div>
      
      {/* right (text content) */}
      <div className="flex flex-col w-full m-1 md:w-[65%]">
        <h1 className="text-xl font-bold md:text-2xl">
          {post.title}
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm font-semibold text-gray-500 md:mb-4">
          <p>@{post.username}</p>
          <div className="flex md:ml-2 space-x-2 m-1">
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        
        {/* Render HTML content snippet */}
        <div dangerouslySetInnerHTML={{ __html: extractTextFromHTML(post && post.desc.slice(0, 200)) }}></div>
      </div>
    </div>
  );
}

export default PostData;
