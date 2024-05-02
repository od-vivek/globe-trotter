import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
import Chart from 'chart.js/auto';
import baseurl from '../api/baseurl';

const AdminDashboard = () => {
    const [data, setData] = useState({});
    const [filterDate, setFilterDate] = useState(new Date());
    const [filtered, setFiltered] = useState([]);
    const dateRef = useRef();

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const response = await axios.get(baseurl + '/api/admin/updates');
                setData(response.data);
                let hold = [];

                for (let i = 0; i < response.data.todayBookings.length; i++) {
                    let first = moment(new Date(filterDate)).format("L");
                    let second = moment(new Date(response.data.todayBookings[i].createdAt)).format("L");


                    if (first === second) {
                        hold.push({...response.data.todayBookings[i]});
                    }
                }

                setFiltered([...hold]);
            } catch (error) {
                console.error('Error fetching updates:', error);
            }
        };

        fetchUpdates();
    }, [filterDate]);

    useEffect(() => {
        if (dateRef.current) {
            dateRef.current.value = moment(new Date).format('YYYY-MM-DD');   
        }
    }, []);

    const [guideData, setGuideData] = useState({});

    useEffect(() => {
        const fetchGuideRevenue = async () => {
            try {
                const response = await axios.get(baseurl + `/api/admin/guide-updates`);
                setGuideData(response.data);
            } catch (error) {
                console.error('Error fetching updates:', error);
            }
        };
    
        fetchGuideRevenue();
    }, []);
    

    const handleFilterDateChange = async (e) => {
        setFilterDate(e.target.value);
    }

    const latestBooking = data.todayBookings ? data.todayBookings[0] : null;

    return (
        <div className="AdminDashboard max-w-6xl mx-auto p-4">
            {/* Extra Data Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Revenue Generated</h3>
                    <p className="text-2xl font-bold">${data.totalRevenue}</p>
                </div>
                <div className="bg-white rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Active Users</h3>
                    <p className="text-2xl font-bold">{data.totalActiveUsers}</p>
                </div>
                <div className="bg-white rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Number of Packages</h3>
                    <p className="text-2xl font-bold">{data.totalPackages}</p>
                </div>
                <div className="bg-white rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Destinations</h3>
                    <p className="text-2xl font-bold">{data.totalDestinations}</p>
                </div>
                <div className="bg-white rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Guides</h3>
                    <p className="text-2xl font-bold">{data.totalGuides}</p>
                </div>
            </div>

            {/* Pie Chart */}
            {guideData.revenueChart && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Guide Revenue</h2>
                    <div style={{ width: '400px', height: '400px', marginBottom: "40px" }}>
                        <Pie
                        data={guideData.revenueChart}
                        options={{
                            maintainAspectRatio: false
                        }}/>
                    </div>
                </div>
            )}

            {/* Revenue Chart */}
            {data.revenueChart && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Revenue Chart</h2>
                    <Bar
                        data={data.revenueChart}
                        options={{
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Packages',
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Revenue',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            )}

            {/* Recent Bookings */}
            {filtered && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Bookings</h2>
                    <input ref={dateRef} className="text-xl font-bold mb-2" type='date' onChange={handleFilterDateChange} />
                    {filtered.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-md p-4 mb-4">
                            <h3 className="text-xl font-bold mb-2">Details</h3>
                            <div className="mb-2">
                                <span className="text-indigo-700 font-semibold">Package:</span> {booking.package}
                            </div>
                            <div className="mb-2">
                                <span className="text-green-700 font-semibold">Number of Members:</span> {booking.numberOfMembers}
                            </div>
                            <div className="mb-2">
                                <span className="text-black-700 font-semibold">Date of Booking:</span> {moment(booking.createdAt).format('L')}
                            </div>
                            <div>
                                <span className="text-red-700 font-bold">Total Amount:</span> <span className="font-bold">${booking.totalAmount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
