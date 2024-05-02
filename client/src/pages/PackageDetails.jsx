import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReviewForm from '../components/ReviewForm';
import baseurl from '../api/baseurl';

const PackageDetails = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  SwiperCore.use([Navigation]);
  const { packageId } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(baseurl + `/api/get/package/${packageId}`);
        const data = await response.json();

        if (response.ok) {
          setPackageDetails(data.packageDetails);
        } else {
          setError('Package not found');
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
        setError('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  useEffect(() => {
    // Fetch user names for each review when the component mounts
    if (packageDetails && packageDetails.reviews) {
      const fetchUserNames = async () => {
        const updatedUsernames = { ...usernames };

        await Promise.all(
          packageDetails.reviews.map(async (review) => {
            if (!updatedUsernames[review.user.username]) {
              const response = await fetch(baseurl + `/api/user/get/${review.user}`);
              const data = await response.json();

              if (response.ok) {
                updatedUsernames[review.user] = data.user.username;
              } else {
                updatedUsernames[review.user] = 'Unknown User';
              }
            }
          })
        );

        setUsernames(updatedUsernames);
      };

      fetchUserNames();
    }
  }, [packageDetails, usernames]);

  const bookNowHandler = () => {
    navigate(`/confirm/${packageDetails._id}`);
  };

  const showReviewsHandler = () => {
    setShowReviews((prevShowReviews) => !prevShowReviews);
  };

  const addReviewHandler = async (reviewContent) => {
    try {
      const response = await fetch(baseurl + `/api/get/packages/review/${packageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: currentUser._id, content: reviewContent }), // Send only the user ID
      });

      const data = await response.json();

      if (response.ok) {
        // Review added successfully, update the UI
        setPackageDetails((prevDetails) => ({
          ...prevDetails,
          reviews: [
            ...prevDetails.reviews,
            { user: currentUser._id, content: reviewContent }, // Use only the user ID
          ],
        }));
        setShowReviewForm(false);
      } else {
        throw new Error(data.message || 'Failed to add review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };


  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {packageDetails && !loading && !error && (
        <div>
          <Swiper navigation style={{ width: '100%' }}>
            {packageDetails.imageUrls.map((url, index) => (
              <SwiperSlide key={index} className="w-full">
                <img src={url} alt={`Slide ${index}`} className='w-full h-[600px]' />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {packageDetails.name} - ${packageDetails.price}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {packageDetails.destination}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                Offer
              </p>
              <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                $200 OFF
              </p>
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {packageDetails.description}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Itinerary - </span>
              {packageDetails.itn.split('\n').map((day, index) => (
                <p key={index} className='text-slate-800'>{day}</p>
              ))}
            </p>
            <div className='flex gap-4'>
              {currentUser ? (
                <button
                  onClick={bookNowHandler}
                  className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
                >
                  Book Now
                </button>
              ) : (
                <p className='text-red-700'>Please log in to book this package.</p>
              )}
              <button
                onClick={showReviewsHandler}
                className='bg-gray-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                <span className='text-green'>Show Reviews</span>
              </button>
              {showReviews && currentUser && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className='bg-green-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
                >
                  Add Review
                </button>
              )}
            </div>
            {showReviewForm && (
              <ReviewForm onSubmit={addReviewHandler} />
            )}
            {showReviews && (
              <div>
                {/* Display reviews here */}
                <h3 className="text-xl font-semibold mt-4">Reviews:</h3>
                {packageDetails.reviews.map((review, index) => (
                  <div key={index} className="border-t-2 border-gray-300 pt-4 mt-4">
                    <p className="text-gray-700">{usernames[review.user] || 'Unknown User'}:</p>
                    <p className="text-gray-800">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default PackageDetails;
