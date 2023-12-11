import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import successImage from '../images/sucess.gif';

const Payment = () => {
  // State to track whether the email has been sent successfully
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const sendConfirmationEmail = async () => {
      try {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Simulate successful email sending
        setEmailSent(true);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }
    };

    sendConfirmationEmail();
  }, []);

  // If the email has been sent successfully, display the thank-you image
  if (emailSent) {
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <img src={successImage} alt="Success" className="max-w-full" style={{ maxHeight: '300px' }} />
          <Link to="/">
            <button className="absolute bottom-0 mb-4 bg-green-500 border border-black text-black p-2 rounded-lg hover:opacity-95 uppercase">
              Go to Home Page
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // If the email hasn't been sent yet, display the loading text
  return (
    <div className="flex items-center justify-center h-screen">
      ..Loading
    </div>
  );
};

export default Payment;
