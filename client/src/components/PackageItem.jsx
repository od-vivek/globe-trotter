import { Link } from 'react-router-dom';

export default function PackageItem({ dest_package }) {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link to={`/package/${dest_package._id}`}>
                <img
                    src={
                        dest_package.imageUrls[0]
                    }
                    alt='dest_package cover'
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                />
                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='truncate text-lg font-semibold text-slate-700'>
                        {dest_package.name}
                    </p>
                    <div className='flex items-center gap-1'>
                        <p className='text-sm text-gray-600 truncate w-full'>
                            {dest_package.destination.name}
                        </p>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-2'>
                        {dest_package.description}
                    </p>
                    <p className='text-slate-500 mt-2 font-semibold '>
                        ${dest_package.price.toLocaleString('en-US')}
                    </p>
                    <div className='text-slate-700 flex gap-4'>
                        <div className='font-bold text-xs'>
                            {dest_package.days} days
                        </div>
                        <div className='font-bold text-xs'>
                            {dest_package.nights} nights
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}