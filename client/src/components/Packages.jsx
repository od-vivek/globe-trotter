// Packages.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PackageItem from './PackageItem';

export default function Packages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { destinationName } = useParams();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`/api/get/packages/${destinationName}`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setPackages(data.packages);
                setLoading(false);
            } catch (error) {
                setError('Error fetching packages');
                setLoading(false);
            }
        };

        fetchPackages();
    }, [destinationName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex-1'>
            <div className='p-7 flex flex-wrap gap-4'>
                {packages.map((dest_package) => (
                    <PackageItem key={dest_package._id} dest_package={dest_package} />
                ))}
            </div>
        </div>
    );
}
