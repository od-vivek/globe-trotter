import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function BlogDetails() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog details based on blogId from the backend
    // Replace the following with your actual API call
    fetch(`/api/blog/${blogId}`)
      .then((response) => response.json())
      .then((data) => setBlog(data.blog))
      .catch((error) => console.error('Error fetching blog details:', error));
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>; // You can add a loading spinner or message
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back to Home
      </Link> */}
      <h2 className="text-3xl font-semibold mt-4">{blog.title}</h2>
      <p className="text-gray-600 text-sm mb-4">{blog.date}</p>
      <div className="prose prose-lg max-w-full">
        {/* Render the blog content using the 'prose' class for better typography */}
        {blog.content}
      </div>
    </div>
  );
}
