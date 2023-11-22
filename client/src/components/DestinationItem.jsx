import { Link } from 'react-router-dom';

export default function DestinationItem({ destination }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/df/${destination._id}`}>
        <img
          src={
            destination.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='destination cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {destination.name}
          </p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'>
          {destination.description}
        </p>
      </Link >
    </div>
  );
}