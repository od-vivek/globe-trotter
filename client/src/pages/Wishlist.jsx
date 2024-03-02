import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WishlistComponent = () => {
    const [wishlist, setWishlist] = useState([]);
    const currentUser = useSelector((state) => state.user.currentUser);
    //   const history = useHistory();
    const navigate = useNavigate();

    const handleBookClick = (destinationId, destinationName) => {
        // Implement the logic for booking the destination
        console.log(`Book button clicked for destination with ID: ${destinationId}`);
        navigate(`/map/${destinationName}`);
        // Redirect to the map with the destination name

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
                // Update your state or perform any additional actions as needed
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
    }, [currentUser, wishlist]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            {wishlist.length === 0 && <p>Your wishlist is empty.</p>}
            <div className="flex space-x-4 overflow-x-auto">
                {wishlist.map((destination) => (
                    <div key={destination._id} className="flex-shrink-0 w-64">
                        <img src={destination.imageUrls[0]} alt={destination.name} className="w-full h-40 object-cover mb-2" />
                        <h3 className="text-lg font-semibold mb-1">{destination.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{destination.description}</p>

                        {/* Buttons for each card */}
                        <div className="flex space-x-2">
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
                ))}
            </div>
        </div>
    );
};

export default WishlistComponent;
