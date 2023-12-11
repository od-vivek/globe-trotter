import { Link } from 'react-router-dom';
export default function DestinationItem({ destination }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] cursor-pointer'>
      <Link to={`/map/${destination.name}`} className='flex flex-col h-full'>
        <img
          src={destination.imageUrls[0]}
          alt='destination cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full flex-grow'>
          <p className='truncate text-lg font-semibold text-slate-700 text-center'>
            {destination.name}
          </p>
          <p className='text-base text-gray-600 line-clamp-3 text-center'>
            {destination.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
