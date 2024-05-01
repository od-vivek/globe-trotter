import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactUs from '../components/ContactUs';

const Success = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [latestBooking, setLatestBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestBooking = async () => {
      try {
        const response = await fetch('/api/user/bookings/latest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: currentUser._id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch latest booking');
        }

        const data = await response.json();
        setLatestBooking(data);
      } catch (error) {
        console.error('Error fetching latest booking:', error);
      }
    };

    fetchLatestBooking();
  }, [currentUser]);

  const redirectToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto text-slate-800">
      <div className="bg-green-500 text-white rounded-md p-4 mb-8">
        <h1 className="text-3xl font-bold mb-2">Booking Successful!</h1>
        <p>Thank you for your booking. Here are the details:</p>
      </div>

      {latestBooking ? (
        <div className="bg-white rounded-md p-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Package Details</h2>
          <p className="mb-2">Package: {latestBooking.package}</p>
          <p className="mb-2">Number of Members: {latestBooking.numberOfMembers}</p>
          <p>Total Amount: ${latestBooking.totalAmount}</p>
          <p className="mt-4 text-green-600">You will receive an email shortly with more details about your booking.</p>
        </div>
      ) : (
        <p>Loading latest booking...</p>
      )}

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={redirectToDashboard}
      >
        Go to Dashboard
      </button>

      {/* Contact Us Section */}
      <h1 className="text-3xl font-bold my-6">Contact Us Here</h1>
      <ContactUs buttonColor="blue" />
    </div>
  );
};

export default Success;
