import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogList = () => {
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [guideBlogs, setGuideBlogs] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // console.log(currentUser);
    const fetchTotalBlogs = async () => {
      try {
        const response = await fetch('/api/blog/get');
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
        const response = await fetch('/api/blog/guideblogs', {
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
      <div className="flex justify-between items-center mb-4">
        {/* <h3 className="text-xl font-semibold">Blogs:</h3> */}
        {currentUser && (
          <Link to="/guide/add-blog" className="bg-blue-500 text-white py-2 px-4 rounded">
            Write a Blog
          </Link>
        )}
      </div>

      {/* Display total blogs */}
      <div>
        <h4 className="text-lg font-semibold mb-2">All Blogs:</h4>
        {totalBlogs.map((blog) => (
          <div key={blog._id} className="mb-6 p-4 border border-gray-300 rounded-md">
            <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
              <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
            </Link>
            <p className="text-gray-800">{blog.content}</p>
          </div>
        ))}
      </div>

      {/* Display guide blogs */}
      {currentUser && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Your Blogs:</h4>
          {guideBlogs.map((blog) => (
            <div key={blog._id} className="mb-6 p-4 border border-gray-300 rounded-md">
              <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
              </Link>
              <p className="text-gray-800">{blog.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
