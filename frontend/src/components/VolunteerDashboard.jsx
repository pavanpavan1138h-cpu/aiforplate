import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaMapMarkerAlt, FaClock, FaBoxOpen } from 'react-icons/fa';

const VolunteerDashboard = () => {
    const { user } = useAuth();
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                // In a real app we would get deliveries or available donations.
                // For this demo, let's just fetch all donations to show available deliveries
                const response = await axios.get('http://localhost:5001/api/donations');

                // Filter only available ones for volunteering
                setDeliveries(response.data.filter(d => d.status === 'available'));
            } catch (error) {
                console.error("Error fetching available deliveries", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    const handleAcceptDelivery = async (donationId) => {
        alert("Delivery accepted! This would call the API POST /api/deliveries");
        // In a full app, this would make the API call to assign the delivery
        // and update local state.
    };

    if (loading) return <div className="text-center py-8">Loading available tasks...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Delivery Tasks</h2>

            {deliveries.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                    No delivery tasks available at the moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deliveries.map((donation) => (
                        <div key={donation._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition flex flex-col">
                            <div className="bg-primary-green px-4 py-2 flex justify-between items-center text-white">
                                <span className="font-semibold">{donation.foodType}</span>
                                <span className="text-sm bg-green-800 px-2 py-1 rounded">Available</span>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <p className="text-sm text-gray-600 mb-4">{donation.description}</p>

                                <div className="space-y-3 mt-auto">
                                    <div className="flex items-start text-sm">
                                        <FaMapMarkerAlt className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                                        <span><span className="font-semibold text-gray-700">Pickup:</span> {donation.pickupLocation?.address || 'Location unavailable'}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FaBoxOpen className="text-accent-orange mr-2 flex-shrink-0" />
                                        <span><span className="font-semibold text-gray-700">Quantity:</span> {donation.quantity}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FaClock className="text-gray-500 mr-2 flex-shrink-0" />
                                        <span><span className="font-semibold text-gray-700">Expires:</span> {new Date(donation.expiryTime).toLocaleTimeString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAcceptDelivery(donation._id)}
                                    className="mt-6 w-full bg-primary-green hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition"
                                >
                                    Accept Delivery
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VolunteerDashboard;
