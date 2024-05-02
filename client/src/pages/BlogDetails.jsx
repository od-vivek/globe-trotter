import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ContactUs from '../components/ContactUs';
import baseurl from '../api/baseurl';

export default function BlogDetails() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [guideDetails, setGuideDetails] = useState(null);

  useEffect(() => {
    console.log(guideDetails);
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(baseurl + `/api/blog/${blogId}`);
        const data = await response.json();
        setBlog(data.blog);
        // Fetch guide details using the guideName from the blog
        const guideResponse = await fetch(baseurl + `/api/get/guide`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ guideName: data.blog.guide }), // Assuming the guideName is stored in the guide field of the blog
        });
        const guideData = await guideResponse.json();
        setGuideDetails(guideData.guide);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  if (!blog || !guideDetails) {
    return <div>Loading...</div>; // You can add a loading spinner or message
  }
  
  return (
    <div className="max-w-3xl mx-auto mb-8 p-6 text-center" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
    <h2 className="text-3xl font-semibold mt-4">{blog.title}</h2>
    <p className="text-gray-600 text-sm mb-4">{blog.date}</p>
    <div className="prose prose-lg max-w-full text-left">
      {blog.content.split('\n').map((paragraph, index) => (
        <React.Fragment key={index}>
          <p>{paragraph}</p>
          {index < blog.content.split('\n').length - 1 && <div style={{ height: '0.5em' }} />}
        </React.Fragment>
      ))}
    </div>
    <p className="text-blue-500 text-right">
      ~ Written by {guideDetails.name}
    </p>
    <div>
      {/* Contact Us Section */}
    <h1 className='text-3xl font-bold mb-4'>Contact {guideDetails.name}</h1>
      <ContactUs buttonColor='black' />
    </div>
  </div>
  );
}
