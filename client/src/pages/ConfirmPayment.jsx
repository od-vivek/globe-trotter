import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';

const ConfirmPaymentPage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { packageId } = useParams();
  const [numberOfMembers, setNumberOfMembers] = useState(1);
  const [memberDetails, setMemberDetails] = useState(Array(1).fill(''));
  const [selectedDate, setSelectedDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Add currentUser details to the state
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch package details only once
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`/api/get/package/${packageId}`);
        const data = await response.json();

        if (response.ok) {
          // Assuming packageDetails includes pricing information
          setPackageDetails(data.packageDetails);
        } else {
          console.error('Error fetching package details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();

    // Set currentUser details to the state if currentUser is defined
    if (currentUser) {
      setUserDetails({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [packageId, currentUser]);

  // Make sure both userDetails and packageDetails are truthy before making the API call
  useEffect(() => {
    if (userDetails && packageDetails) {
      // Calculate amount based on the stored package details and number of members
      setTotalAmount(numberOfMembers * packageDetails.price);
    }
  }, [numberOfMembers, packageDetails, userDetails]);

  const handleMemberChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setNumberOfMembers(count);
    setMemberDetails(Array(count).fill(''));
  };

  const handleNameChange = (index, event) => {
    const updatedMembers = [...memberDetails];
    updatedMembers[index] = event.target.value;
    setMemberDetails(updatedMembers);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    // Check if the selected date is valid
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);

    // Check if the selected date is in the future and at least 5 days in advance
    if (selectedDateObj > currentDate && selectedDateObj.getTime() - currentDate.getTime() >= 5 * 24 * 60 * 60 * 1000) {
      setSelectedDate(selectedDate);
      setError(''); // Clear any previous error message
    } else {
      // Show an error message
      setError('Invalid date selected. Please choose a date in the future and at least 5 days in advance.');
    }
  };

  const handlePayButtonClick = async () => {
    // Validate all fields before proceeding to payment
    const memberErrors = memberDetails.some((name) => name.trim() === '');
    const dateError = selectedDate === '';

    if (memberErrors || dateError) {
      setError(
        `Please fill in ${memberErrors && dateError
          ? 'all the details'
          : memberErrors
            ? 'all member details'
            : 'the travel date'
        } before proceeding to payment.`
      );
    } else {
      // Clear any previous errors
      setError('');

      // Set loading state to true
      setLoading(true);

      // Prepare data to send to the server
      const formData = {
        userDetails, // Make sure userDetails is included
        packageDetails,
        formDetails: {
          numberOfMembers,
          memberDetails,
          selectedDate,
          totalAmount,
        },
      };

      try {
        // Send data to the server
        const response = await fetch('/api/send-confirmation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // If the email is sent successfully, set payment success state to true
          setPaymentSuccess(true);
          // Navigate to '/payment' without using history
          setError(<span className="text-green-500">Payment successful. Please check your email.</span>);
          setLoading(false);

          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          const data = await response.json();
          console.error('Error sending confirmation email:', data.error);
          setError('Error sending confirmation email. Please try again.');
        }
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        setError('Error sending confirmation email. Please try again.');
      } finally {
        // Set loading state back to false
        setLoading(false);
      }
    }
  };

  return (
    <div className='max-w-lg mx-auto p-4 my-10 border border-color3 shadow-md rounded-lg hover:scale-105 transition-transform'>
      <div className='flex flex-col items-center mb-5'>
        <img alt='logo' src={logo} className='max-h-10' />
        <span className='font-bold text color3 mt-2 text-2xl text-center'>Confirm Booking</span>
      </div>

      <form className='flex flex-col gap-3'>
        <label className='text-lg font-semibold'>Number of Members</label>
        <input
          type='number'
          value={numberOfMembers}
          min={1}
          onChange={handleMemberChange}
          className='border p-3 rounded-lg'
        />

        {/* Member details input */}
        {Array.from({ length: numberOfMembers }, (_, index) => (
          <div key={index}>
            <label className='text-lg font-semibold'>Name of member {index + 1} </label>
            <input
              type='text'
              value={memberDetails[index] || ''}
              onChange={(event) => handleNameChange(index, event)}
              className='border p-3 rounded-lg'
            />
          </div>
        ))}

        {/* Date selection input */}
        <label className='text-lg font-semibold'>Select Travel Date</label>
        <input
          type='date'
          value={selectedDate}
          onChange={handleDateChange}
          className='border p-3 rounded-lg'
        />
        {error && <p className="text-red-500">{error}</p>}

        {/* Display total amount centered and in bold */}
        <div className="text-lg font-bold mt-2 text-center">Total Amount: ${totalAmount}</div>

        {/* Display PAY button or LOADING text based on the loading state */}
        <div className='flex items-center justify-center mt-4 ml-4'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <button
                onClick={handlePayButtonClick}
                className='bg-green-500 border border-black text-black p-2 rounded-lg hover:opacity-95 uppercase'>
                Pay
              </button>
              <Link to={'/'}>
                <span className='text-red-500 ml-4'>
                  <button className='border border-red-500 p-2 rounded-lg hover:opacity-95 uppercase'>
                    Cancel
                  </button>
                </span>
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ConfirmPaymentPage;
