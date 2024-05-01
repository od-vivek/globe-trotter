import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`/api/user/bookings/${currentUser._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const data = await response.json();
                setBookings(data.bookings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to fetch bookings');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []); // Include currentUser._id in the dependency array to re-fetch bookings when the user changes

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">Booking History</h2>
                <Link
                    to="/wishlist"
                    className="rounded-full bg-color4 text-white uppercase py-2 px-3 rounded-md hover:bg-blue-600 transition duration-300 text-sm flex items-center justify-center"
                // style={{ textDecoration: 'none', cursor: 'default' }}
                >
                    Wishlist
                </Link>
            </div>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="border p-4 rounded-md shadow-md">
                            <p className="text-lg font-bold mb-2">Package: {booking.package}</p>
                            <p>Date: {new Date(booking.selectedDate).toLocaleDateString()}</p>
                            <p>Number of Members: {booking.numberOfMembers}</p>
                            <p>Total Amount: ${booking.totalAmount}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
