import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className='bg-color1'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap text-color4'></h1>
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
            <li className='text-color4 hover:text-color3 hover:scale-110'>About Us </li>
          </Link>
          <Link to='/login'>
            <li className='text-color4 hover:text-color3 hover:scale-110'>Login</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
