import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DonorDashboard from '../components/DonorDashboard';
import ReceiverDashboard from '../components/ReceiverDashboard';
import VolunteerDashboard from '../components/VolunteerDashboard';
import AdminDashboard from '../components/AdminDashboard';
import UrgentAlerts from '../components/UrgentAlerts';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    const renderDashboard = () => {
        switch (user.role) {
            case 'donor':
                return <DonorDashboard />;
            case 'receiver':
                return <ReceiverDashboard />;
            case 'volunteer':
                return <VolunteerDashboard />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return <div className="glass p-8 text-center text-red-500 font-bold">Invalid Role: {user.role}</div>;
        }
    };

    return (
        <div className="container mx-auto px-4 pt-32 pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">
                            Welcome back, <span className="text-primaryGreen">{user.name.split(' ')[0]}</span>!
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
                            Helping the world as a <span className="capitalize font-black text-gray-700 dark:text-gray-200">{user.role}</span>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                        Status: Active Network
                    </div>
                </div>
            </motion.div>

            {/* Show Urgent Alerts for relevant roles */}
            {['volunteer', 'donor', 'admin'].includes(user.role) && (
                <UrgentAlerts />
            )}

            <div className="grid grid-cols-1 gap-8">
                {renderDashboard()}
            </div>
        </div>
    );
};

export default Dashboard;
