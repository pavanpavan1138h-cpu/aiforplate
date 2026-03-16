import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const DonorDashboard = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        foodType: '',
        quantity: '',
        description: '',
        pickupTime: '',
        expiryTime: '',
        pickupLocation: {
            address: '',
            lat: 0,
            lng: 0,
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'address') {
            setFormData({
                ...formData,
                pickupLocation: { ...formData.pickupLocation, address: e.target.value }
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/donations', formData, config);
            setMessage('Donation submitted successfully!');
            setFormData({
                foodType: '',
                quantity: '',
                description: '',
                pickupTime: '',
                expiryTime: '',
                pickupLocation: { address: '', lat: 0, lng: 0 }
            });
        } catch (err) {
            setMessage('Error submitting donation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit a Food Donation</h2>

            {message && (
                <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Food Type</label>
                        <input
                            type="text"
                            name="foodType"
                            required
                            value={formData.foodType}
                            onChange={handleChange}
                            placeholder="e.g., Cooked Rice, Mixed Veggies, Bread"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            required
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="e.g., 50 meals, 10 kg"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Any specific details (e.g., contains nuts, needs refrigeration)"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
                    <input
                        type="text"
                        name="address"
                        required
                        value={formData.pickupLocation.address}
                        onChange={handleChange}
                        placeholder="Full street address"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pickup Time</label>
                        <input
                            type="datetime-local"
                            name="pickupTime"
                            required
                            value={formData.pickupTime}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Time</label>
                        <input
                            type="datetime-local"
                            name="expiryTime"
                            required
                            value={formData.expiryTime}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green transition"
                    >
                        {loading ? 'Submitting...' : 'Submit Donation'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonorDashboard;
