import React, { useState, useEffect } from 'react';
import PackageItem from '../components/PackageItem';
import { useLocation } from 'react-router-dom';

export default function Search() {
  const location = useLocation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/get?query=${searchTermFromUrl}`);
        const data = await response.json();

        if (data.success) {
          setPackages(data.packages);
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
        Search results:
      </h1>
      <div className='p-7 flex flex-wrap gap-4'>
        {!loading && packages.length === 0 && (
          <p className='text-xl text-slate-700'>No packages found!</p>
        )}
        {loading && (
          <p className='text-xl text-slate-700 text-center w-full'>
            Loading...
          </p>
        )}

        {!loading &&
          packages &&
          packages.map((dest_package) => (
            <PackageItem key={dest_package._id} dest_package={dest_package} />
          ))}
      </div>
    </div>
  );

}
