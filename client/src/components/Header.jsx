import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUserStart, signoutUserSuccess, signoutUserFailure } from '../redux/user/userSlice';
import logo from '../images/logo.png';

export default function Header() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Dispatch action to start the logout process (loading state)
      dispatch(signoutUserStart());

      // Make a request to the server to clear the authentication token
      const res = await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle server response
      if (res.status === 200) {
        // Clear the authentication token on the client side
        dispatch(signoutUserSuccess());
        // Redirect to the home page or login page
        navigate('/');
      } else {
        // If there's an issue with the server response, handle it
        dispatch(signoutUserFailure('Logout failed'));
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // If there's an error, handle it
      dispatch(signoutUserFailure('Logout failed'));
    }
  };


  return (
    <header className='bg-color1'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
        <Link className='flex items-center gap-3' to='/'>
          <img
            alt='logo'
            src={logo}
            className='max-h-10' // Set a maximum height for the logo
          />
          <span className='font-bold text color4'>GlobeTrotter</span>
        </Link>
        <form className='text-center bg-color1 p-2 rounded-full flex justify-center items-center hover:scale-105 hover:px-5 border-2 border-color3'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent border-color3 focus:outline-none w-24 sm:w-64'
          />
          <button>
            <FaSearch className='text-color4'></FaSearch>
          </button>
        </form>

        <ul className='flex gap-9'>
          <Link to='/'>
            <li className='text-color4 hover:text-color3 hover:scale-110'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='text-color4 hover:text-color3 hover:scale-110'>About Us</li>
          </Link>
          {currentUser ? (
            <>
              <li onClick={handleLogout} className='text-color4 hover:text-color3 hover:scale-110 cursor-pointer'>
                Logout
              </li>
              <Link to='/profile'>
                <li className='text-color4 hover:text-color3 hover:scale-110'>Profile</li>
              </Link>
            </>
          ) : (
            <Link to='/login'>
              <li className='text-color4 hover:text-color3 hover:scale-110'>Login</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
