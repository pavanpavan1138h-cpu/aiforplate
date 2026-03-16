import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ReceiverDashboard = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        foodTypeRequired: '',
        quantityNeeded: '',
        urgency: 'medium',
        location: {
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
                location: { ...formData.location, address: e.target.value }
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

            await axios.post('http://localhost:5000/api/requests', formData, config);
            setMessage('Food request submitted successfully!');
            setFormData({
                foodTypeRequired: '',
                quantityNeeded: '',
                urgency: 'medium',
                location: { address: '', lat: 0, lng: 0 }
            });
        } catch (err) {
            setMessage('Error submitting request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Food Donation</h2>

            {message && (
                <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Required Food Type</label>
                        <input
                            type="text"
                            name="foodTypeRequired"
                            required
                            value={formData.foodTypeRequired}
                            onChange={handleChange}
                            placeholder="e.g., Any cooked food, Raw Vegetables"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity Needed</label>
                        <input
                            type="text"
                            name="quantityNeeded"
                            required
                            value={formData.quantityNeeded}
                            onChange={handleChange}
                            placeholder="e.g., Enough for 50 people"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                    <input
                        type="text"
                        name="address"
                        required
                        value={formData.location.address}
                        onChange={handleChange}
                        placeholder="Full street address for delivery"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
                    <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-primary-green focus:border-primary-green"
                    >
                        <option value="low">Low (Next 24-48 hours)</option>
                        <option value="medium">Medium (Today)</option>
                        <option value="high">High (Immediate/ASAP)</option>
                    </select>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange transition"
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReceiverDashboard;
