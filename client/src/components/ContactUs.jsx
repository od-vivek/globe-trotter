import React, { useState } from 'react';

const ContactUs = () => {
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const sendEmail = () => {
    const subject = 'Contact Us - GlobeTrotter';
    const recipientEmail = 'globetrotter.iiitsproject@gmail.com';
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className='flex flex-col gap-2'>
      <textarea
        name='message'
        id='message'
        rows='2'
        value={message}
        onChange={onChange}
        placeholder='Enter your message here...'
        className='w-full border p-3 rounded-lg'
      ></textarea>

      <button
        onClick={sendEmail}
        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
      >
        Send Message
      </button>
    </div>
  );
};

export default ContactUs;
