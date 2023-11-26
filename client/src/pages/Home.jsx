import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DestinationItem from '../components/DestinationItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';

export default function Home() {
  SwiperCore.use([Navigation]);
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(destinations);

  const fetchDestinations = async () => {
    try {
      const res = await fetch(`/api/get/destinations?destinationsPerPage=4&page=${currentPage}`);
      const data = await res.json();

      setDestinations((prevDestinations) => [...prevDestinations, ...data.destinations]);
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
          Explore <span className='text-color-500'> Discover </span>
          <br />
          <span className='text-color3-500'> Wander </span>
        </h3>
        <div className='text-color4-400 text-xs sm:text-sm'>
          Embark on unforgettable journeys and discover your ideal destination with ease.
        </div>
        <Link
          to={'/signup'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      <Swiper navigation>
        {destinations &&
          destinations.length > 0 &&
          destinations.map((destination) => (
            <SwiperSlide key={destination._id}>
              <div
                style={{
                  background: `url(${destination.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[700px]'
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
              <h2 className='text-2xl font-semibold text-color3-600'>Popular Destinations</h2>
            </div>
            <div className='flex flex-wrap gap-4'>
              {destinations.map((destination) => (
                <DestinationItem destination={destination} key={destination._id} />
              ))}
            </div>
            {currentPage < totalPages && (
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={''}
                onClick={showMoreHandler}
              >
                Show more destinations
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
