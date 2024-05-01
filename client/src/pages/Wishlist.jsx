import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WishlistComponent = () => {
    const [wishlist, setWishlist] = useState([]);
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    const handleBookClick = (destinationId, destinationName) => {
        console.log(`Book button clicked for destination with ID: ${destinationId}`);
        navigate(`/map/${destinationName}`);
    };

    const handleDeleteClick = async (destinationId, destinationName) => {
        try {
            const userId = currentUser._id;

            const response = await fetch(`/api/user/delete-from-wishlist/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ destinationName }),
            });

            if (response.ok) {
                console.log('Destination removed from wishlist successfully');

                // Update the state to remove the deleted destination
                setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== destinationId));
            } else {
                console.error('Failed to remove destination from wishlist');
            }
        } catch (error) {
            console.error('Error deleting from wishlist:', error);
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch(`/api/user/fetch-wishlist/${currentUser._id}`);
                const data = await response.json();
                setWishlist(data.wishlist);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        if (currentUser) {
            fetchWishlist();
        }
    }, [currentUser]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            {wishlist.length === 0 && <p>Your wishlist is empty.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlist.map((destination) => (
                    <div
                        key={destination._id}
                        className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] cursor-pointer"
                    >
                        <div className="flex flex-col h-full">
                            <img
                                src={destination.imageUrls[0]}
                                alt={destination.name}
                                className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                            />
                            <div className="p-3 flex flex-col gap-2 w-full flex-grow">
                                <p className="truncate text-lg font-semibold text-slate-700 text-center">
                                    {destination.name}
                                </p>
                                <p className="text-base text-gray-600 line-clamp-3 text-center">
                                    {destination.description}
                                </p>

                                {/* Buttons for each card */}
                                <div className="flex justify-center space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleBookClick(destination._id, destination.name)}
                                    >
                                        Book
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDeleteClick(destination._id, destination.name)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistComponent;
