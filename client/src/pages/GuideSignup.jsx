// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  resetError,
  signInSuccess,
} from '../redux/user/userSlice';
import logo from '../images/logo.png';
import baseurl from '../api/baseurl';

// GuideSignup component
export default function GuideSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ guideName: '', guideEmail: '', guidePassword: '', guidePhoto: null });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(formData);
    dispatch(resetError());
    dispatch(signUpSuccess(null)); // Reset loading state
  }, [dispatch]);

  const changeHandler = (event) => {
    if (event.target.type === 'file') {
      setFormData({
        ...formData,
        [event.target.id]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(signUpStart());

      const formDataObject = new FormData();

      for (const key in formData) {
        formDataObject.append(key, formData[key]);
      }
      console.log(formDataObject);
      const res = await fetch(baseurl + '/api/auth/guide/signup', {
        method: 'POST',
        body: formDataObject,  // Use the FormData object here
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
      } else {
        navigate('/guide/login');
      }
    } catch (e) {
      console.error('Error during guide signup:', e);
      dispatch(signUpFailure('An error occurred during guide signup.'));
    }
  };


  return (
    <div className='max-w-lg mx-auto p-4 my-10 border border-color3 shadow-md rounded-lg hover:scale-105 transition-transform'>
      <div className='flex flex-col items-center mb-5'>
        <img alt='logo' src={logo} className='max-h-10' />
        <span className='font-bold text color3 mt-2 text-2xl text-center'>Sign Up</span>
      </div>

      <form onSubmit={submitHandler} encType="multipart/form-data" className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Name'
          className='border p-3 rounded-lg'
          id='guideName'
          onChange={changeHandler}
        />
        <input
          type='text'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='guideEmail'
          onChange={changeHandler}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='guidePassword'
          onChange={changeHandler}
        />
        <label htmlFor='guidePhoto' className='text-color4'>
          Upload Your Photo here .
        </label>
        <input
          type='file'
          accept='image/*'
          onChange={changeHandler}
          className='border p-3 rounded-lg'
          id='guidePhoto'
        />
        <div className='flex flex-col gap-2 mt-3'>
          <button
            disabled={loading}
            className='bg-color4 text-white p-3 rounded-lg hover:opacity-95 uppercase'
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>

        </div>
      </form>

      {error && <p className='text-red-500 mt-3'>{error}</p>}

      <div className='flex items-center justify-center mt-4'>
        <p className='mr-2'>Already have an account?</p>
        <Link to={'/guide/login'}>
          <span className='text-blue-600'>Login</span>
        </Link>
      </div>
    </div>
  );
}
