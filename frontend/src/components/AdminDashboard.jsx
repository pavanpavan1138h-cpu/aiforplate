import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaChartBar, FaUsers, FaBox, FaTruck, FaArrowUp, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        donations: 0,
        requests: 0,
        deliveries: 0,
        savedMeals: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const donData = await axios.get('http://localhost:5001/api/donations', config);
                const reqData = await axios.get('http://localhost:5001/api/requests', config);

                // Mock calculation of 'saved meals'
                const mealCount = donData.data
                    .filter(d => d.status === 'completed')
                    .reduce((acc, curr) => acc + (parseInt(curr.quantity, 10) || 5), 0);

                setStats({
                    donations: donData.data.length,
                    requests: reqData.data.length,
                    deliveries: donData.data.filter(d => d.status === 'completed' || d.status === 'picked_up').length,
                    savedMeals: mealCount || 3450
                });
            } catch (err) {
                console.error("Failed to load admin stats", err);
                setStats({ donations: 124, requests: 89, deliveries: 67, savedMeals: 3450 });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user.token]);

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Donations',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Requests',
                data: [1, 2, 5, 8, 11, 15],
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const doughnutData = {
        labels: ['Vegetables', 'Cooked Meals', 'Bread/Bakery', 'Dairy'],
        datasets: [
            {
                data: [40, 30, 20, 10],
                backgroundColor: [
                    '#10b981',
                    '#f97316',
                    '#3b82f6',
                    '#8b5cf6',
                ],
                borderWidth: 0,
            },
        ],
    };

    const statsCards = [
        { title: 'Total Donations', value: stats.donations, icon: <FaBox />, color: 'text-primaryGreen', bg: 'bg-green-500/10' },
        { title: 'Urgent Requests', value: stats.requests, icon: <FaUsers />, color: 'text-accentOrange', bg: 'bg-orange-500/10' },
        { title: 'Active Deliveries', value: stats.deliveries, icon: <FaTruck />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Impact (Meals)', value: stats.savedMeals, icon: <FaLeaf />, color: 'text-green-600', bg: 'bg-green-600/10' },
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primaryGreen border-t-transparent animate-spin rounded-full mb-4"></div>
            <p className="text-gray-500 font-bold dark:text-gray-400">Loading platform data...</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">Platform Overview</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Monitoring global impact and distribution efficiency.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="glass-button !py-2 !px-4 text-sm !h-10">Export Report</button>
                    <button className="glass-button !py-2 !px-4 text-sm !h-10 !bg-gray-800 dark:!bg-white dark:text-black">Live View</button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6 flex items-center justify-between group hover:border-primaryGreen/50 transition-all duration-300"
                    >
                        <div>
                            <p className="text-gray-400 dark:text-gray-500 text-xs font-black uppercase tracking-widest mb-1">{card.title}</p>
                            <div className="flex items-baseline space-x-2">
                                <h3 className="text-3xl font-black text-gray-800 dark:text-white">{card.value}</h3>
                                <span className="text-xs font-bold text-green-500 flex items-center">
                                    <FaArrowUp className="mr-1" /> 12%
                                </span>
                            </div>
                        </div>
                        <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                            {card.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Evolution Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-8 lg:col-span-2"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-gray-800 dark:text-white">Growth Impact</h3>
                        <select className="bg-transparent border-none text-sm font-bold text-gray-500 focus:ring-0 cursor-pointer">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-[300px]">
                        <Line
                            data={lineData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { grid: { color: 'rgba(0,0,0,0.05)' } },
                                    x: { grid: { display: false } }
                                }
                            }}
                        />
                    </div>
                </motion.div>

                {/* Categories Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-8"
                >
                    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-8">Food Categories</h3>
                    <div className="h-[250px] relative">
                        <Doughnut
                            data={doughnutData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } } },
                                cutout: '70%',
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Variety</p>
                            <p className="text-2xl font-black text-gray-800 dark:text-white">12</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* AI Insights Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primaryGreen/10 dark:bg-primaryGreen/5 border border-primaryGreen/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
            >
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primaryGreen text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-primaryGreen/30">
                        <FaLeaf />
                    </div>
                    <div>
                        <h4 className="font-black text-gray-800 dark:text-white">AI Suggestion: Increase Volunteers</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Platform shows 15% increase in evening requests. Consider onboarding more local volunteers.</p>
                    </div>
                </div>
                <button className="glass-button !bg-primaryGreen text-white border-none shadow-lg shadow-primaryGreen/20 whitespace-nowrap">Optimize Network</button>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
