import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { signoutUserStart, signoutUserSuccess, signoutUserFailure } from '../redux/user/userSlice';
import { resetError  } from '../redux/user/userSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, error } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        // Clear errors when the component mounts
        dispatch(resetError);
    
        // Cleanup function to clear errors on component unmount
        return () => {
          dispatch(resetError);
        };
      }, [dispatch]);

    const changeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleLogout = async () => {
        try {
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
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`/api/user/${currentUser.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                dispatch(signoutUserSuccess());
                navigate('/');
            } else {
                const data = await response.json();
                dispatch(signoutUserFailure(data.message || 'Account deletion failed'));
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

    return (
        <div className='max-w-md mx-auto p-4 my-5 border border-color3 shadow-md rounded-lg hover:scale-105 transition-transform'>
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
                    type="button"
                    onClick={() => console.log('Update Profile')}
                    className='bg-color4 text-white p-3 rounded-lg hover:opacity-95 uppercase'
                >
                    Update Profile
                </button>
                <button
                    type="button"
                    onClick={() => console.log('Reset Password')}
                    className='bg-color3 text-white p-3 rounded-lg hover:opacity-95 uppercase'
                >
                    Reset Password
                </button>
            </form>

            <div className="flex justify-between mt-4"> {/* Added a flex container with justify-between */}
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

            {error && <p className='text-red-500 mt-2'>Error: {error}</p>}
        </div>
    );
};

export default Profile;
