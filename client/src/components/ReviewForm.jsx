import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState('');

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(review);
    setReview('');
  };

  return (
    <div className='max-w-xl mx-auto p-4 my-10 mx-15 border border-color3 shadow-md rounded-lg hover:scale-105 transition-transform'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <textarea
          placeholder='Write your review...'
          className='border p-3 rounded-lg h-30 w-100'  // Adjusted the height to h-40
          value={review}
          onChange={handleChange}
        />
        <button className='bg-color4 text-white p-3 rounded-lg hover:opacity-95 uppercase'>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
