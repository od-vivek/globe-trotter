import { IconButton, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const GuideCard = ({ guideDetails, isGuideChanged, setIsGuideChanged}) => {
  const deleteHandler = async (id) => {
    const res = await axios.delete(`/api/admin/guides/${id}`);
    if (res?.status === 200) {
      setIsGuideChanged(!isGuideChanged);
    }
  };

  return (
    <Typography fontSize="1rem">
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] cursor-pointer'>
        <div className='p-3 flex flex-col gap-2 w-full flex-grow'>
          <p className='truncate text-lg font-semibold text-slate-700 text-center'>
            {guideDetails.name}
          </p>
        </div>
      <IconButton
            color="primary"
            aria-label="delete guideDetails"
            onClick={() => {
              deleteHandler(guideDetails?._id);
            }}
            sx={{float: "right"}}
          >
            <DeleteIcon sx={{ color: '#E74C3C', fontSize: '2rem' }} />
          </IconButton>
    </div>
      
    </Typography>
  );
};

export default GuideCard;
