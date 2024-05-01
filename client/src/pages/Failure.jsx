import React from 'react';
import ContactUs from '../components/ContactUs';

export default function AboutUs() {
  return (
    <div className='py-10 px-4 max-w-6xl mx-auto text-slate-800'>
      <h1 className='text-3xl font-bold mb-4'>About GlobeTrotter</h1>
      <p className='mb-4 text-ml'>
        Welcome to <span className='font-bold'>GlobeTrotter</span>, your ultimate travel companion. We are passionate about providing you with unforgettable travel experiences, making every journey an adventure to remember.
      </p>
      <p className='mb-4 text-ml'>
        At GlobeTrotter, we believe that travel is not just about reaching a destination; it's about the joy of exploration, the thrill of discovery, and the connections made along the way. Our mission is to inspire and facilitate your travel dreams, ensuring that every trip with us is filled with excitement and enrichment.
      </p>
      <p className='mb-4 text-ml'>
        Our team of travel enthusiasts is dedicated to curating unique itineraries, uncovering hidden gems, and providing you with the tools and resources to create your own extraordinary travel stories.
      </p>
      <h2 className='text-2xl font-bold mt-6 mb-4'>Our Vision</h2>
      <p className='mb-4 text-ml'>
        Our vision is to redefine the way you experience the world. We aspire to be more than just a travel platform; we aim to be your trusted guide, sparking your curiosity and encouraging you to explore new horizons. We envision a world where travel fosters understanding, connection, and a deep appreciation for the diverse cultures that make our planet extraordinary.
      </p>
      <h2 className='text-2xl font-bold mt-6 mb-4'>Why Choose GlobeTrotter?</h2>
      <ul className='list-disc pl-6 mb-4 text-ml'>
        <li>Experienced Guides: Our team of experienced travel guides brings extensive knowledge and a passion for exploration to every journey.</li>
        <li>Curated Experiences: We carefully curate travel experiences that go beyond the ordinary, ensuring that each trip is filled with unique moments and cultural insights.</li>
        <li>Personalized Planning: Your travel preferences matter. Our personalized planning services cater to your interests, creating bespoke itineraries tailored just for you.</li>
        <li>Global Network: With a global network of partners and collaborators, we offer access to exclusive destinations and insider experiences.</li>
      </ul>
      <p className='mb-4 text-ml'>
        Whether you're an avid adventurer seeking thrilling escapades, a culture enthusiast craving immersive experiences, or a leisure traveler in search of relaxation, GlobeTrotter is your gateway to a world of possibilities. Join us in exploring the beauty and diversity of our planet, one adventure at a time.
      </p>

      {/* Contact Us Section */}
      <h1 className='text-3xl font-bold mb-4'>Contact Us Here</h1>
      <ContactUs buttonColor='black' />
    </div>
  );
}
