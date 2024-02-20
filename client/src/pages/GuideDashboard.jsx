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


  useEffect(() => {
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
          Become a Guide<span className='text-color-500'></span>
          <br />
          {/* <span className='text-color3-500'> Wander </span> */}
        </h3>
        <div className='text-color4-400 text-xs sm:text-sm'>
            Help people travel safely and happily through your experiences. 
        </div>
        {!currentUser && (
          <Link to={'/guide/signup'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Guide Signup
          </Link>
        )}
      </div>
      <Swiper navigation style={{ width: '100%' }}>
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
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-color3-600'>Write about some of these popular destinations</h2>
            </div>
            <div className='flex flex-wrap justify-center gap-4'>
              {destinations.map((destination, index) => (
                <div
                  className="relative transition-transform transform hover:scale-105"
                  key={destination._id}
                  onMouseEnter={() => setCurrentHovered(destination._id)}
                  onMouseLeave={() => setCurrentHovered(null)}
                >
                  <DestinationItem destination={destination} key={destination._id} />
                  {currentHovered === destination._id && (
                    <Link to={`/map/${destination.name}`} className='flex flex-col h-full'>
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                        <div className="text-white text-center">
                          <h3 className="text-2xl font-semibold">{destination.name}</h3>
                          <p className="text-sm">{destination.description}</p>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {currentPage < totalPages && (
              <div className='flex justify-center mt-4'>
                <Link
                  className='text-sm text-blue-800 hover:underline'
                  onClick={showMoreHandler}
                >
                  Show more destinations
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}