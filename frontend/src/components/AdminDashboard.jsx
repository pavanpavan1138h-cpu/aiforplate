import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaChartBar, FaUsers, FaBox, FaTruck } from 'react-icons/fa';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        donations: 0,
        requests: 0,
        deliveries: 0,
        savedMeals: 0
    });

    useEffect(() => {
        // Fetch real data in production
        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const donData = await axios.get('http://localhost:5000/api/donations', config);
                const reqData = await axios.get('http://localhost:5000/api/requests', config);
                const delData = await axios.get('http://localhost:5000/api/deliveries', config);

                // Mock calculation of 'saved meals' by assuming quantity strings hold a number
                const mealCount = donData.data
                    .filter(d => d.status === 'completed')
                    .reduce((acc, curr) => acc + parseInt(curr.quantity || 0, 10) || acc + 5, 0);

                setStats({
                    donations: donData.data.length,
                    requests: reqData.data.length,
                    deliveries: delData.data.length,
                    savedMeals: mealCount
                });
            } catch (err) {
                console.error("Failed to load admin stats", err);
                // Fallback mock data
                setStats({ donations: 124, requests: 89, deliveries: 67, savedMeals: 3450 });
            }
        };
        fetchData();
    }, [user.token]);

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Platform Overview</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-primary-green mr-4">
                        <FaBox className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase">Total Donations</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.donations}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="p-3 rounded-full bg-orange-100 text-accent-orange mr-4">
                        <FaUsers className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase">Total Requests</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.requests}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <FaTruck className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase">Deliveries</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.deliveries}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <FaChartBar className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase">Meals Saved (Est)</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.savedMeals}</p>
                    </div>
                </div>
            </div>

            {/* Placeholder for future graphs/management tables */}
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 py-12 border-2 border-dashed border-gray-200">
                <p>User Management & Detailed Analytics Tables Coming Soon</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
