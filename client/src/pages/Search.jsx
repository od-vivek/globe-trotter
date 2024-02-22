import React, { useState, useEffect } from 'react';
import PackageItem from '../components/PackageItem';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Search() {
  const location = useLocation();
  const [packages, setPackages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    console.log(searchTermFromUrl);
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/get?searchTerm=${searchTermFromUrl}`);
        const data = await response.json();

        if (data.success) {
          setPackages(data.packages);
          setBlogs(data.blogs);
        } else {
          console.error('Error fetching search results:', data.message);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex-1'>
      <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
        Packages:
      </h1>
      <div className='p-7 flex flex-wrap gap-4'>
        {!loading && packages.length === 0 && (
          <p className='text-xl text-slate-700'>No packages found!</p>
        )}

        {!loading &&
          packages &&
          packages.map((dest_package) => (
            <PackageItem key={dest_package._id} dest_package={dest_package} />
          ))}
      </div>
      <div>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Related Blogs:
        </h1>
        {!loading && blogs.length === 0 && (
          <p className='text-xl text-slate-700'>No blogs found!</p>
        )}
        {blogs.map((blog) => (
          <div key={blog._id} className="mb-6 p-4 border border-gray-300 rounded-md">
            <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
              <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
            </Link>
            <p className="text-gray-800">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
