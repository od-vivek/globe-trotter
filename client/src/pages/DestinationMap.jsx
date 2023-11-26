import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';

const DestinationMap = () => {
    const { destinationName } = useParams();
    const [locationData, setLocationData] = useState(null);
    console.log(locationData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.geoapify.com/v1/geocode/search?text=${destinationName}&format=json&apiKey=${process.env.REACT_APP_MAP_API_KEY}`
                );

                if (response.data && response.data.results && response.data.results.length > 0) {
                    setLocationData(response.data.results[0]);
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };

        fetchData();
    }, [destinationName]);

    return (
        <div>
            <h1>Map for {destinationName}</h1>
            {locationData && (
                <MapContainer center={[locationData.lat, locationData.lon]} zoom={13} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[locationData.lat, locationData.lon]}>
                        <Popup>{destinationName}</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default DestinationMap;
