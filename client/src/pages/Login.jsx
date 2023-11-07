import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

export default function Login() {
  return (
    <div className='max-w-lg mx-auto p-4 my-10 border border-color3 shadow-md rounded-lg'>
      <div className='flex flex-col items-center mb-5'>
        <img
          alt='logo'
          src={logo}
          className='max-h-10'
        />
        <span className='font-bold text color4 mt-2 text-2xl text-center'>Login</span>
      </div>

      <form className='flex flex-col gap-5'>
        <input
          type='text'
          placeholder='Email'
          className='border p-4 rounded-lg'
          id='email'
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-4 rounded-lg'
          id='password'
        />
        <button
          className='bg-slate-700 text-white p-4 rounded-lg hover:opacity-95 uppercase'
        >
          Login
        </button>
      </form>

      <div className='flex justify-between items-center mt-3'>
        <p>Don't have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-600'>Sign Up</span>
        </Link>
      </div>

      <p className='text-red-500 mt-3'>
        {/* Error message */}
      </p>
    </div>
  );
}
