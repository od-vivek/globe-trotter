import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  postBlogStart,
  postBlogSuccess,
  postBlogFailure,
  resetError
} from '../redux/user/userSlice';
import logo from '../images/logo.png';

export default function BlogForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);

  // Clear error on component mount
  useEffect(() => {
    dispatch(resetError());
    dispatch(postBlogSuccess(null)); // Reset loading state
  }, [dispatch]);

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(postBlogStart());
      // Assuming `currentUser` has a property `guideId`
      const guideName  = currentUser.name;
      const response = await fetch('http://localhost:5000/api/blog/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, guideName }), // Include guideId in the request body
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(postBlogSuccess(data)); // Assuming the blog data is returned from the API
        // Optionally, you can redirect to the newly created blog or any other page
        navigate(`/guide/dashboard`);
      } else {
        const data = await response.json();
        dispatch(postBlogFailure(data.message || 'An error occurred while posting the blog.'));
      }
    } catch (error) {
      console.error('Error posting blog:', error);
      dispatch(postBlogFailure('An error occurred while posting the blog.'));
    }
  };

  return (
    <div className='p-6 my-10 mx-auto shadow-md rounded-lg'>
      <div className='flex flex-col items-center mb-5'>
        <img alt='logo' src={logo} className='max-h-10' />
        <span className='font-bold text color3 mt-2 text-2xl text-center'>Write a Blog</span>
      </div>

      <form onSubmit={submitHandler} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Title'
          className='border p-3 rounded-lg'
          id='title'
          onChange={changeHandler}
        />
        <textarea
          placeholder='Content'
          className='border p-3 rounded-lg resize-none'
          id='content'
          onChange={changeHandler}
          rows='10' // Adjust the number of rows as needed
        />
        <div className='flex flex-col gap-2 mt-3'>
          <button
            disabled={loading}
            className='bg-color4 text-white p-3 rounded-lg hover:opacity-95 uppercase focus:outline-none'
          >
            {loading ? 'Posting...' : 'Post Blog'}
          </button>
        </div>
      </form>

      {error && <p className='text-red-500 mt-3'>Error: {error}</p>}
    </div>
  );
}
