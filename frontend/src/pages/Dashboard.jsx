import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import DonorDashboard from '../components/DonorDashboard';
import ReceiverDashboard from '../components/ReceiverDashboard';
import VolunteerDashboard from '../components/VolunteerDashboard';
import AdminDashboard from '../components/AdminDashboard';
// Import other dashboards here as they are built

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
                return <div>Invalid Role Dashboard</div>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
                <p className="text-gray-600">You are logged in as a <span className="font-semibold capitalize text-primary-green">{user.role}</span>.</p>
            </div>

            {renderDashboard()}
        </div>
    );
};

export default Dashboard;
