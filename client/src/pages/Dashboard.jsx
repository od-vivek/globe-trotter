import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import {
    signoutUserStart,
    signoutUserSuccess,
    signoutUserFailure,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailure,
} from '../redux/user/userSlice';
import { resetError } from '../redux/user/userSlice';
import BookingHistory from '../components/BookingHistory';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, error } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        username: currentUser?.username || '',
        email: currentUser?.email || '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    const changeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            dispatch(signoutUserStart());

            const response = await fetch('/api/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                dispatch(signoutUserSuccess());
                navigate('/');
            } else {
                const data = await response.json();
                dispatch(signoutUserFailure(data.message || 'Logout failed'));
            }
        } catch (error) {
            console.error('Error during logout:', error);
            dispatch(signoutUserFailure('Logout failed'));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + document.cookie.split('=')[1],
                },
                credentials: 'include',
            });

            if (response.ok) {
                dispatch(signoutUserSuccess());
                navigate('/');
            } else {
                const data = await response.json().catch(() => null);
                console.error('Account deletion failed. Response:', response);
                dispatch(signoutUserFailure(data?.message || 'Account deletion failed'));
            }
        } catch (error) {
            console.error('Error during account deletion:', error);
            dispatch(signoutUserFailure('Account deletion failed'));
        }
    };

    const showDeleteConfirmation = () => {
        setShowConfirmation(true);
    };

    const hideDeleteConfirmation = () => {
        setShowConfirmation(false);
    };

    const confirmDeleteAccount = () => {
        hideDeleteConfirmation();
        handleDeleteAccount();
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            if (formData.newPassword !== formData.confirmPassword) {
                dispatch(updateProfileFailure('New password and confirm password do not match'));
                return;
            }

            let passwordCheckResponse;

            if (formData.newPassword) {
                passwordCheckResponse = await fetch(`/api/user/check-password/${currentUser._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + document.cookie.split('=')[1],
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        currentPassword: formData.password,
                    }),
                });

                if (!passwordCheckResponse.ok) {
                    const data = await passwordCheckResponse.json().catch(() => null);
                    console.error('Password check failed. Response:', passwordCheckResponse);
                    dispatch(updateProfileFailure(data?.message || 'Password check failed'));
                    return;
                }
            }

            dispatch(updateProfileStart());

            const requestBody = {
                username: formData.username,
                email: formData.email,
                newPassword: formData.newPassword,
            };

            if (formData.newPassword && formData.password) {
                requestBody.currentPassword = formData.password;
            }

            const response = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + document.cookie.split('=')[1],
                },
                credentials: 'include',
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(updateProfileSuccess(data.user));
                setSuccessMessage('Profile updated successfully');

                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                }, 1500);
            } else {
                const data = await response.json().catch(() => null);
                console.error('Profile update failed. Response:', response);
                dispatch(updateProfileFailure(data?.message || 'Profile update failed'));
            }
        } catch (error) {
            console.error('Error during profile update:', error);
            dispatch(updateProfileFailure('Profile update failed'));
        }
    };

    return (
        <div className='flex' style={{ justifyContent: "space-evenly", minHeight: "85vh", position: "relative" }}>
            {/* User Profile Component */}
            <div className='w-full max-w-md p-4 my-5 border border-color3 shadow-md rounded-lg hover:scale-105 transition-transform' style={{ height: "100%" }}>
                <div className='flex flex-col items-center mb-3'>
                    <img alt='logo' src={logo} className='max-h-8' />
                    <span className='font-bold text color3 mt-2 text-lg text-center'>User Profile</span>
                </div>

                <form className='flex flex-col gap-3'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={changeHandler}
                        className='border p-2 rounded'
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={changeHandler}
                        className='border p-2 rounded'
                        disabled
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={changeHandler}
                        className='border p-2 rounded'
                    />
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={changeHandler}
                        className='border p-2 rounded'
                    />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        className='border p-2 rounded'
                    />
                    <button
                        type="submit"
                        onClick={handleUpdateProfile}
                        className={`bg-color4 text-white p-3 rounded-lg hover:opacity-95 uppercase ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={showDeleteConfirmation}
                        className='text-red-600'
                    >
                        Delete Account
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className='text-green-600'
                    >
                        Sign Out
                    </button>
                </div>

                {showConfirmation && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-lg">
                            <p>Are you sure you want to delete your account?</p>
                            <div className="flex justify-end mt-4">
                                <button onClick={hideDeleteConfirmation} className="mr-4">Cancel</button>
                                <button onClick={confirmDeleteAccount} className="text-red-600">Delete</button>
                            </div>
                        </div>
                    </div>
                )}

                {successMessage && (
                    <p className='text-green-500 mt-2 bg-green-100 border border-green-500 p-1 rounded-sm flex justify-center'>
                        {successMessage}
                    </p>
                )}

                {error && (
                    <p className='text-red-500 mt-2 bg-red-100 border border-red-500 p-1 rounded-sm flex justify-center'>
                        {error}
                    </p>
                )}
            </div>
            {currentUser && currentUser.role === "user" && (
            <div className='w-full max-w-md p-4 my-5 border border-color3 shadow-md rounded-lg hover:scale-105 transition-transform' style={{ overflowY: 'scroll', height: '100%' }}>
                <BookingHistory />
            </div>
            )}
            {/* <button
                onClick={handleCheckWishlist}
                className='bg-blue-500 text-white p-3 rounded-lg hover:opacity-95 uppercase mt-4'
            >
                Check Wishlist
            </button> */}
        </div>
    );
};

export default Dashboard;
