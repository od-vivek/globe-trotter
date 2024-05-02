import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import baseurl from '../api/baseurl';

const BlogList = () => {
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [guideBlogs, setGuideBlogs] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // console.log(currentUser);
    const fetchTotalBlogs = async () => {
      try {
        const response = await fetch(baseurl + '/api/blog/get');
        const data = await response.json();
        setTotalBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching total blogs:', error);
        // Handle error, e.g., display an error message to the user
      }
    };

    const fetchGuideBlogs = async () => {
      try {
        if (!currentUser) {
          return;
        }
        const response = await fetch(baseurl + '/api/blog/guideblogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ guideName: currentUser.name }),
        });

        const data = await response.json();
        setGuideBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching guide blogs:', error);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchTotalBlogs();
    fetchGuideBlogs();
  }, [currentUser]);

  return (
    <div className="container mx-auto my-8 p-8 bg-transparent rounded-md">
      {/* Display total blogs */}
      <div>
        <h4 className="text-lg font-semibold mb-2">All Blogs:</h4>
        {totalBlogs.map((blog) => (
          <div key={blog._id} className="mb-6 p-4 border border-gray-300 rounded-md">
            <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
              <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
            </Link>
            <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
              <p className="text-gray-800 font-bold">{blog.guide}</p>
            </Link>
            <p className="text-gray-800">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
