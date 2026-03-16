import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaHandsHelping, FaMapMarkerAlt } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-primary-green relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-24 pb-32">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                            <span className="block mb-2">Reducing food waste and</span>
                            <span className="block text-accent-orange">feeding communities using technology</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-green-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Connect surplus food from restaurants, events, and homes directly to organizations and people who need it most.
                        </p>
                        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                <Link
                                    to="/register"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-green bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-green focus:ring-white transition"
                                >
                                    Donate Food
                                </Link>
                                <Link
                                    to="/register"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-green focus:ring-accent-orange transition"
                                >
                                    Request Food
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How it works section */}
            <div className="py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            A simple, three-step process to help your community.
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary-green text-white mx-auto">
                                    <FaHeart className="h-8 w-8" />
                                </div>
                                <h3 className="mt-6 text-xl font-medium text-gray-900">1. Donate</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    Restaurants, events, or individuals list surplus food on our platform.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-accent-orange text-white mx-auto">
                                    <FaMapMarkerAlt className="h-8 w-8" />
                                </div>
                                <h3 className="mt-6 text-xl font-medium text-gray-900">2. Connect</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    NGOs and shelters find matching donations in their area and request pickup.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-600 text-white mx-auto">
                                    <FaHandsHelping className="h-8 w-8" />
                                </div>
                                <h3 className="mt-6 text-xl font-medium text-gray-900">3. Deliver</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    Volunteers securely transport the food from the donor to the receiver.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
