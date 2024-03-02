import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DestinationItem from '../components/DestinationItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';

export default function Home() {
  SwiperCore.use([Navigation]);
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentHovered, setCurrentHovered] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [totalBlogs, setTotalBlogs] = useState([]);

  console.log(destinations);

  const fetchDestinations = async () => {
    try {
      const res = await fetch(`/api/get/destinations?destinationsPerPage=6&page=${currentPage}`);
      const data = await res.json();

      // Clear destinations when fetching the first page
      if (currentPage === 1) {
        setDestinations(data.destinations);
      } else {
        // Append new destinations to the existing ones
        setDestinations((prevDestinations) => [...prevDestinations, ...data.destinations]);
      }

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchTotalBlogs();
    fetchDestinations();
  }, [currentPage]);

  const showMoreHandler = () => {
    // Fetch more destinations only if there are more pages
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      {/* top */}

      <div className='flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto mt-1'>
        <h3 className='text-color4 font-bold text-3xl lg:text-6xl'>
          Explore, <span className='text-color-500'> Discover, </span>
          <br />
          <span className='text-color3-500'> Wander </span>
        </h3>
        <div className='text-color4-400 text-xs sm:text-sm'>
          Embark on unforgettable journeys and discover your ideal destination with ease.
        </div>
        {!currentUser && (
          <Link to={'/signup'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Let's get started...
          </Link>
        )}
      </div>
      <Swiper autoplay={{ delay: 5000 }} navigation style={{ width: '100%' }}>
        {destinations &&
          destinations.length > 0 &&
          destinations.map((destination) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${destination.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[800px]'
                key={destination._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* destination results for destinations */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {destinations && destinations.length > 0 && (
          <div className=''>
            <div className="text-center mb-3">
              <h2 className="text-2xl font-bold">Popular Destinations</h2>
            </div>
            <div className='flex flex-wrap justify-center gap-4'>
              {destinations.map((destination, index) => (
                <div
                  className="relative transform hover:scale-105"
                  key={destination._id}
                  onMouseEnter={() => setCurrentHovered(destination._id)}
                  onMouseLeave={() => setCurrentHovered(null)}
                >
                  <DestinationItem destination={destination} key={destination._id} />
                </div>
              ))}
            </div>
            {currentPage < totalPages && (
              <div className='flex justify-center mt-4'>
                <Link
                  to='#'  // Replace '#' with the actual link if needed
                  className='inline-flex items-center px-4 py-2 border border-blue-800 rounded-md text-sm text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-300'
                  onClick={showMoreHandler}
                >
                  <span className="focus:outline-none">Show more destinations</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>


            )}
          </div>
        )}
        <div className="text-center mb-1">
          <h2 className="text-2xl font-bold">Popular Blogs</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {totalBlogs.map((blog) => (
            <div key={blog._id} className="p-6 border border-gray-300 rounded-md">
              <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
              </Link>
              <p className="text-gray-800 line-clamp-3">{blog.content}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}