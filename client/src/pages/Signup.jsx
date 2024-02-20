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
import app from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup } from 'firebase/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(resetError());
    dispatch(signUpSuccess(null)); // Reset loading state
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
      dispatch(signUpStart());
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        if (data.errors) {
          // Handle validation errors
          const errorMessage = data.errors.map((error) => error.msg).join(', ');
          dispatch(signUpFailure(errorMessage));
        } else {
          // Handle other errors
          dispatch(signUpFailure(data.message));
        }
      } else {
        // Save user in the database here
        navigate('/login');
      }
    } catch (e) {
      console.error('Error during signup:', e);
      dispatch(signUpFailure('An error occurred during signup.'));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      dispatch(resetError()); // Reset any form errors
      setFormData({ username: '', email: '', password: '' }); // Reset form fields

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
      } else {
        // Save user in the database here
        dispatch(signInSuccess(data));
        if (data.createdWithGoogle) {
          // Redirect to a different page or handle the scenario for users signed up with Google
          navigate('/profile'); // Change this to your desired route
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Could not sign in with Google.', error);
      dispatch(signUpFailure('Failed to sign in with Google.'));
      navigate('/signup');
    }
  };


  return (
    <div className='max-w-lg mx-auto p-4 my-10 border border-color3 shadow-md rounded-lg hover:scale-105 transition-transform'>
      <div className='flex flex-col items-center mb-5'>
        <img alt='logo' src={logo} className='max-h-10' />
        <span className='font-bold text color3 mt-2 text-2xl text-center'>Sign Up</span>
      </div>

      <form onSubmit={submitHandler} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={changeHandler}
        />
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
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          {/* <button
            onClick={handleGoogleSignIn}
            className='bg-color3 text-white p-3 rounded-lg hover:opacity-95 uppercase'
          >
            Continue with Google
          </button> */}
        </div>
      </form>

      {error && <p className='text-red-500 mt-3'>{error}</p>}

      <div className='flex items-center justify-center mt-4'>
        <p className='mr-2'>Already have an account?</p>
        <Link to={'/login'}>
          <span className='text-blue-600'>Login</span>
        </Link>
      </div>
      <div className='flex items-center justify-center mt-4'>
        <p className='mr-2'>Have Travel Experience ? </p>
        <Link to={'/guide'}>
          <span className='text-blue-600'>Become a Guide</span>
        </Link>
      </div>
    </div>
  );
}
