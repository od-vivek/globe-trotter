import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import baseurl from '../api/baseurl';

const BlogCard = ({ blog, isBlogChanged, setIsBlogChanged }) => {
  const deleteHandler = async (id) => {
    const res = await axios.delete(baseurl + `/api/admin/blogs/${id}`);
    if (res?.status === 200) {
      setIsBlogChanged(!isBlogChanged);
    }
  };

  return (
    <Typography fontSize="1rem">
      <div
        key={blog._id}
        className="mb-6 p-4 border border-gray-300 rounded-md"
        style={{ textAlign: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
            <h4 className="text-xl font-semibold mb-2" style={{ textAlign: 'center' }}>
              {blog.title}
            </h4>
          </Link>
          <IconButton
            color="primary"
            aria-label="delete blog"
            onClick={() => {
              deleteHandler(blog?._id);
            }}
          >
            <DeleteIcon sx={{ color: '#E74C3C', fontSize: '2rem' }} />
          </IconButton>
        </div>
        <p className="text-gray-800" style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
          {blog.content}
        </p>
      </div>
    </Typography>
  );
};

export default BlogCard;
