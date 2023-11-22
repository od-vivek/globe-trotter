import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DestinationItem from '../components/DestinationItem';

export default function Home() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('/api/get/destinations?destinationsPerPage=4&page=1');
        const data = await res.json();
        setDestinations(data.destinations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-color4 font-bold text-3xl lg:text-6xl'>
          Explore <span className='text-color-500'> Discover </span>
          <br />
          <span className='text-color3-500'> Wander </span>
        </h1>
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

      {/* listing results for destinations */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {destinations && destinations.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-color3-600'>Recent destinations</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?destinations=true'}>
                Show more destinations
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {destinations.map((destination) => (
                <DestinationItem destination={destination} key={destination._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
