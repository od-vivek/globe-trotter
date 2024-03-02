import React, { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import Packages from '../components/Packages';
import { useSelector } from 'react-redux';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';

const createCustomIcon = () =>
    new Icon({
        iconUrl: 'data:image/png;base64,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', // Replace with the path to your custom icon
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
    });


const DestinationMap = () => {
    const navigate = useNavigate();
    const { destinationName } = useParams();
    const [locationData, setLocationData] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [wishlistMessage, setWishlistMessage] = useState('');

    const addToWishlist = async () => {
        console.log(currentUser);
        const dest = destinationName;
        console.log("clicked");
        try {
            const response = await fetch(`/api/user/add-to-wishlist/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dest }),
            });

            if (response.ok) {  
                navigate('/wishlist');
                const data = await response.json();
                setWishlistMessage(data.message);
            } else {
                setWishlistMessage('Failed to add product to wishlist');
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            setWishlistMessage('Internal server error');
        }
    };

    useEffect(() => {
        const fetchBlogsForKeyword = async (keyword) => {
            try {
                const response = await fetch('/api/blog/dest-blogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ destination: keyword }),
                });

                const data = await response.json();

                if (data.blogs) {
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.geoapify.com/v1/geocode/search?text=${destinationName}&format=json&apiKey=7afcb9e63f7940e5987441fd7d90a403`
                );

                if (response.data && response.data.results && response.data.results.length > 0) {
                    setLocationData(response.data.results[0]);
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };

        fetchBlogsForKeyword(destinationName);
        fetchData();
    }, [destinationName]);

    return (
        <div>
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                <h2 className="text-center mb-5 mt-5 text-3xl font-bold">Location</h2>
                {locationData && (
                    <MapContainer center={[locationData.lat, locationData.lon]} zoom={5} style={{ height: '600px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[locationData.lat, locationData.lon]} icon={createCustomIcon()}>
                            <Popup>{destinationName}</Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
            <div className="text-center mb-5 mt-5">
                <h2 className="text-3xl font-bold">Available Packages</h2>
                <Packages />
            </div>

            {locationData && (
                <div className="flex justify-center mb-5">
                    <button onClick={addToWishlist} className='bg-color4 text-white p-3 rounded-lg hover:opacity-95 uppercase'>
                        Add to Wishlist
                    </button>
                </div>
            )}

            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Featured Blogs</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
                {blogs.map((blog) => (
                    <div key={blog._id} className="p-6 border border-gray-300 rounded-md">
                        <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                            <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
                        </Link>
                        <p className="text-gray-800 line-clamp-3">{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default DestinationMap;