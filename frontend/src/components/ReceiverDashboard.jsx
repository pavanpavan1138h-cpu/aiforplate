import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaInbox, FaWeightHanging, FaMapMarkerAlt, FaExclamationTriangle, FaInfoCircle, FaLocationArrow } from 'react-icons/fa';

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
    const [message, setMessage] = useState({ text: '', type: '' });
    const [detecting, setDetecting] = useState(false);

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

    const detectLocation = () => {
        setDetecting(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();
                        setFormData({
                            ...formData,
                            location: {
                                address: data.display_name || 'Location Detected',
                                lat: latitude,
                                lng: longitude
                            }
                        });
                        setMessage({ text: 'Delivery location detected!', type: 'success' });
                    } catch (err) {
                        setFormData({
                            ...formData,
                            location: { ...formData.location, lat: latitude, lng: longitude }
                        });
                        setMessage({ text: 'Coordinates detected, please verify address.', type: 'info' });
                    } finally {
                        setDetecting(false);
                    }
                },
                (error) => {
                    setMessage({ text: 'Geolocation failed. Please enter manually.', type: 'error' });
                    setDetecting(false);
                }
            );
        } else {
            setMessage({ text: 'Geolocation not supported by your browser.', type: 'error' });
            setDetecting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('http://localhost:5001/api/requests', formData, config);
            setMessage({ text: 'Food request submitted successfully! We are matching you with donors.', type: 'success' });
            setFormData({
                foodTypeRequired: '',
                quantityNeeded: '',
                urgency: 'medium',
                location: { address: '', lat: 0, lng: 0 }
            });
        } catch (err) {
            setMessage({ text: 'Error submitting request. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 md:p-8 mb-8 overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accentOrange/10 rounded-bl-full -z-10"></div>

            <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-accentOrange/20 text-accentOrange rounded-2xl flex items-center justify-center text-2xl">
                    <FaInbox />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-800 dark:text-white">Request Food Support</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Post your needs and our AI will notify local donors.</p>
                </div>
            </div>

            {message.text && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 mb-8 rounded-xl flex items-center space-x-3 border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400' :
                            message.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400' :
                                'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400'
                        }`}
                >
                    <FaInfoCircle className="flex-shrink-0" />
                    <span className="font-semibold text-sm">{message.text}</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Required Food Type</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                <FaInbox />
                            </div>
                            <input
                                type="text"
                                name="foodTypeRequired"
                                required
                                value={formData.foodTypeRequired}
                                onChange={handleChange}
                                placeholder="Any cooked food, raw veggies, etc."
                                className="glass-input pl-12"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Quantity Needed</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                <FaWeightHanging />
                            </div>
                            <input
                                type="text"
                                name="quantityNeeded"
                                required
                                value={formData.quantityNeeded}
                                onChange={handleChange}
                                placeholder="e.g., Enough for 50 people"
                                className="glass-input pl-12"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Delivery Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <FaMapMarkerAlt />
                        </div>
                        <input
                            type="text"
                            name="address"
                            required
                            value={formData.location.address}
                            onChange={handleChange}
                            placeholder="Full street address for delivery"
                            className="glass-input pl-12 pr-12"
                        />
                        <button
                            type="button"
                            onClick={detectLocation}
                            disabled={detecting}
                            title="Auto-detect location"
                            className="absolute inset-y-2 right-2 px-3 flex items-center bg-accentOrange hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            {detecting ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                            ) : (
                                <FaLocationArrow className="text-sm" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Urgency Level</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <FaExclamationTriangle />
                        </div>
                        <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="glass-input pl-12 appearance-none cursor-pointer"
                        >
                            <option value="low">Low (Next 24-48 hours)</option>
                            <option value="medium">Medium (Today)</option>
                            <option value="high">High (Immediate/ASAP)</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="glass-button w-full md:w-auto h-14 !px-10 text-lg shadow-accentOrange/20 !bg-accentOrange hover:!bg-orange-600"
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                                <span>Submitting...</span>
                            </div>
                        ) : 'Submit Request'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default ReceiverDashboard;
