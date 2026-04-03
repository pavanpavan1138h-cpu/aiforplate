import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUtensils, FaWeightHanging, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaInfoCircle, FaLocationArrow } from 'react-icons/fa';

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
        },
        image: null
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [detecting, setDetecting] = useState(false);

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

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
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
                            pickupLocation: {
                                address: data.display_name || 'Location Detected',
                                lat: latitude,
                                lng: longitude
                            }
                        });
                        setMessage({ text: 'Location detected successfully!', type: 'success' });
                    } catch (err) {
                        setFormData({
                            ...formData,
                            pickupLocation: { ...formData.pickupLocation, lat: latitude, lng: longitude }
                        });
                        setMessage({ text: 'Coordinates detected, but failed to fetch address.', type: 'info' });
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

            await axios.post('http://localhost:5001/api/donations', formData, config);
            setMessage({ text: 'Donation submitted successfully! Thank you for your generosity.', type: 'success' });
            setFormData({
                foodType: '',
                quantity: '',
                description: '',
                pickupTime: '',
                expiryTime: '',
                pickupLocation: { address: '', lat: 0, lng: 0 },
                image: null
            });
        } catch (err) {
            setMessage({ text: 'Error submitting donation. Please try again.', type: 'error' });
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-primaryGreen/10 rounded-bl-full -z-10"></div>

            <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-primaryGreen/20 text-primaryGreen rounded-2xl flex items-center justify-center text-2xl">
                    <FaUtensils />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-800 dark:text-white">Submit Food Donation</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">AI will match you with the nearest receiver instantly.</p>
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
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Food Type</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                <FaUtensils />
                            </div>
                            <input
                                type="text"
                                name="foodType"
                                required
                                value={formData.foodType}
                                onChange={handleChange}
                                placeholder="Cooked meals, bread, etc."
                                className="glass-input pl-12"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Quantity</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                <FaWeightHanging />
                            </div>
                            <input
                                type="text"
                                name="quantity"
                                required
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="50 meals, 10 kg"
                                className="glass-input pl-12"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Description & Dietary Notes</label>
                    <textarea
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g., Contains nuts, needs refrigeration, vegetarian only"
                        className="glass-input min-h-[100px]"
                    ></textarea>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Food Image</label>
                    <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-primaryGreen dark:hover:border-primaryGreen transition-colors flex flex-col items-center justify-center cursor-pointer overflow-hidden glass">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {formData.image ? (
                            <div className="flex flex-col items-center text-primaryGreen font-bold space-y-2">
                                <span className="w-12 h-12 bg-primaryGreen/20 flex items-center justify-center rounded-full text-2xl">✓</span>
                                <p>{formData.image.name}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 space-y-2">
                                <span className="text-3xl">📸</span>
                                <p className="font-bold">Click or drag image to upload</p>
                                <p className="text-xs">Supports JPG, PNG (Max 5MB)</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Pickup Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <FaMapMarkerAlt />
                        </div>
                        <input
                            type="text"
                            name="address"
                            required
                            value={formData.pickupLocation.address}
                            onChange={handleChange}
                            placeholder="Full street address"
                            className="glass-input pl-12 pr-12"
                        />
                        <button
                            type="button"
                            onClick={detectLocation}
                            disabled={detecting}
                            title="Auto-detect location"
                            className="absolute inset-y-2 right-2 px-3 flex items-center bg-primaryGreen hover:bg-primaryGreen-dark text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            {detecting ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                            ) : (
                                <FaLocationArrow className="text-sm" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Preferred Pickup Time</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                <FaClock />
                            </div>
                            <input
                                type="datetime-local"
                                name="pickupTime"
                                required
                                value={formData.pickupTime}
                                onChange={handleChange}
                                className="glass-input pl-12 appearance-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Food Expiry Time</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                <FaCalendarAlt />
                            </div>
                            <input
                                type="datetime-local"
                                name="expiryTime"
                                required
                                value={formData.expiryTime}
                                onChange={handleChange}
                                className="glass-input pl-12 appearance-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="glass-button w-full md:w-auto h-14 !px-10 text-lg shadow-primaryGreen/20"
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                                <span>Submitting...</span>
                            </div>
                        ) : 'Submit Donation'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default DonorDashboard;
