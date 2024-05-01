import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser && currentUser.role === 'admin';

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const isGuidePath = location.pathname.startsWith('/guide');
  if (isAdmin) {
    return (
      <header className='bg-gray-200'>
        <div className='flex justify-center items-center max-w-6xl mx-auto p-3'>
          <ul className='flex gap-9'>
            <Link to='/admin/dashboard'>
              <li className='text-color4 hover:text-color3 hover:scale-110'>Dashboard</li>
            </Link>
            <Link to='/admin/manage'>
              <li className='text-color4 hover:text-color3 hover:scale-110'>Manage</li>
            </Link>
            <Link to='/admin/profile'>
              <li className='text-color4 hover:text-color3 hover:scale-110'>Profile</li>
            </Link>
          </ul>
        </div>
      </header>
    );
  }
  // if(currentUser.role === 'admin') return (<div></div>)
  return (
    <header className='bg-gray-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link className='flex items-center gap-2' to='/'>
          <img alt='logo' src={logo} className='max-h-10' />
          <span className='font-bold text color4'>GlobeTrotter</span>
        </Link>
        <form
          onSubmit={handleSearch}
          className='text-center bg-color1 p-2 rounded-full flex justify-center items-center hover:scale-105 hover:px-5 border-2 border-color3'
        >
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search...'
            className='bg-transparent border-color3 focus:outline-none w-24 sm:w-64'
          />

          <button type='submit'>
            <FaSearch className='text-color4'></FaSearch>
          </button>
        </form>

        {isGuidePath ? (<ul className='flex gap-9'>
          <Link to='/guide/dashboard'>
            <li className='text-color4 hover:text-color3 hover:scale-110'>Dashboard</li>
          </Link>
          <Link to='/guide/packages'>
            <li className='text-color4 hover:text-color3 hover:scale-110'>Packages</li>
          </Link>
          <Link to='guide/blogs'>
              <li className='text-color4 hover:text-color3 hover:scale-110'>Blogs</li>
          </Link>
          <Link to='guide/profile'>
              <li className='text-color4 hover:text-color3 hover:scale-110'>Profile</li>
          </Link>
        </ul>
        ) : (
          <ul className='flex gap-9'>
            <Link to='/'>
              <li className='text-color4 hover:text-color3 hover:scale-110'>Home</li>
            </Link>
            <Link to='/about'>
              <li className='text-color4 hover:text-color3 hover:scale-110'>About Us</li>
            </Link>
            {currentUser ? (
              <Link to='/dashboard'>
                <li className='text-color4 hover:text-color3 hover:scale-110'>Dashboard</li>
              </Link>
            ) : (
              <Link to='/login'>
                <li className='text-color4 hover:text-color3 hover:scale-110'>Login</li>
              </Link>
            )}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
