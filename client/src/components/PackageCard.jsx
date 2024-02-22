import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const PackageCard = ({ packageDetails, isPackageChanged, setIsPackageChanged, isPackage }) => {
  const deleteHandler = async (id) => {
    const res = await axios.delete(`/api/admin/${isPackage ? "packages" : "destinations"}/${id}`);
    if (res?.status === 200) {
      setIsPackageChanged(!isPackageChanged);
    }
  };

  return (
    <Typography fontSize="1rem">
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] cursor-pointer'>
      <Link to={`/map/${packageDetails.name}`} className='flex flex-col h-full'>
        <img
          src={`${packageDetails.imageUrls[0]}`}
          alt='packageDetails cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full flex-grow'>
          <p className='truncate text-lg font-semibold text-slate-700 text-center'>
            {packageDetails.name}
          </p>
          <p className='text-base text-gray-600 line-clamp-3 text-center'>
            {packageDetails.description}
          </p>
        </div>
      </Link>
      <IconButton
            color="primary"
            aria-label="delete packageDetails"
            onClick={() => {
              deleteHandler(packageDetails?._id);
            }}
            sx={{float: "right"}}
          >
            <DeleteIcon sx={{ color: '#E74C3C', fontSize: '2rem' }} />
          </IconButton>
    </div>
      
    </Typography>
  );
};

export default PackageCard;
