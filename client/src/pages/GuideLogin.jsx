import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure, resetError } from '../redux/user/userSlice';
import logo from '../images/logo.png';
import app from '../firebase'; // Import your Firebase app instance
import { GoogleAuthProvider } from 'firebase/auth'; // Import GoogleAuthProvider separately
import { getAuth, signInWithPopup } from 'firebase/auth'; // Import getAuth and signInWithPopup separately

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  // Clear error on component mount
  useEffect(() => {
    dispatch(resetError());
    dispatch(signInSuccess(null)); // Reset loading state
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
      dispatch(signInStart());

      const response = await fetch('/api/auth/guide/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        dispatch(signInSuccess(data.guide));
        navigate('/guide/dashboard');
      } else {
        const data = await response.json();
        dispatch(signInFailure(data.message || 'An error occurred during login.'));
      }
    } catch (error) {
      console.error('Error during login:', error);
      dispatch(signInFailure('An error occurred during login.'));
    }
  };


  return (
    <div className='max-w-lg mx-auto p-4 my-10 border border-color3 shadow-md rounded-lg hover:scale-105 transition-transform'>
      <div className='flex flex-col items-center mb-5'>
        <img alt='logo' src={logo} className='max-h-10' />
        <span className='font-bold text color3 mt-2 text-2xl text-center'>Login for Guides</span>
      </div>

      <form onSubmit={submitHandler} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={changeHandler}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={changeHandler}
        />
        <div className='flex flex-col gap-2 mt-3'>
          <button
            disabled={loading}
            className='bg-color4 text-white p-3 rounded-lg hover:opacity-95 uppercase'
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          {/* <button
            onClick={handleGoogleSignIn}
            className='bg-color3 text-white p-3 rounded-lg hover:opacity-95 uppercase'
          >
            Continue with Google
          </button> */}
        </div>
      </form>
      <div className='flex items-center justify-center mt-4'>
        <p className='mr-2'>Don't have an account?</p>
        <Link to={'/guide/signup'}>
          <span className='text-blue-600'>Sign Up</span>
        </Link>
      </div>
      <div className='flex items-center justify-center mt-4'>
        {/* <p className='mr-2'>Are you a guide ? </p>
        <Link to={'/guide'}>
          <span className='text-blue-600'>Guide Login</span>
        </Link> */}
      </div>

      {error && <p className='text-red-500 mt-3'>Error: {error}</p>}
    </div>
  );
}
