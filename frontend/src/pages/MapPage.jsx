import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaCompass, FaLayerGroup } from 'react-icons/fa';

// Fix leaflet default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom AI-themed animated icons
const donorIcon = new L.divIcon({
    className: 'custom-div-wrapper',
    html: '<div class="animated-marker donor"></div>',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
});

const receiverIcon = new L.divIcon({
    className: 'custom-div-wrapper',
    html: '<div class="animated-marker receiver"></div>',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
});

const MapPage = () => {
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isHeatmapView, setIsHeatmapView] = useState(false);

    const defaultCenter = [37.7749, -122.4194];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use fallback to 5001 if 5000 fails (from truncated logs context)
                const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api');
                const [donationsRes, requestsRes, deliveriesRes] = await Promise.all([
                    axios.get(`${baseUrl}/donations`),
                    axios.get(`${baseUrl}/requests`),
                    axios.get(`${baseUrl}/deliveries`).catch(() => ({ data: [] }))
                ]);

                setDonations(donationsRes.data.filter(d => d.status === 'available'));
                setRequests(requestsRes.data.filter(r => r.status === 'pending'));
                setDeliveries(deliveriesRes.data.filter(d => d.status === 'in_progress' || d.status === 'accepted'));
            } catch (error) {
                console.error("Error fetching map data", error);
            }
        };

        fetchData();
    }, []);

    const filteredDonations = donations.filter(d =>
        d.foodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.pickupLocation?.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredRequests = requests.filter(r =>
        r.foodTypeRequired.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location?.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden">

            {/* Glass Overlays */}
            <div className="absolute top-6 left-6 right-6 z-[1000] flex flex-col md:flex-row gap-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass flex-1 max-w-2xl h-14 rounded-2xl flex items-center px-4 shadow-2xl"
                >
                    <FaSearch className="text-gray-400 mr-3" />
                    <input
                        type="text"
                        placeholder="Search for food types or areas..."
                        className="bg-transparent border-none focus:ring-0 text-gray-800 dark:text-white w-full font-bold"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-4"></div>
                    <button className="text-primaryGreen hover:text-primaryGreen-dark transition-colors">
                        <FaCompass className="text-xl" />
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass h-14 px-6 rounded-2xl flex items-center space-x-4 shadow-2xl self-start"
                >
                    <button 
                        onClick={() => setIsHeatmapView(!isHeatmapView)}
                        className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${isHeatmapView ? 'bg-accentOrange text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white'}`}
                    >
                        <FaLayerGroup className="mr-1" /> Heatmap
                    </button>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-primaryGreen flex-shrink-0 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-800 dark:text-white hidden md:inline">Donations</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-accentOrange flex-shrink-0 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-800 dark:text-white hidden md:inline">Requests</span>
                    </div>
                </motion.div>
            </div>

            {/* Map Container */}
            <div className="h-full w-full relative z-0">
                <MapContainer
                    center={defaultCenter}
                    zoom={13}
                    zoomControl={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {/* Deliveries (Routes) */}
                    {deliveries.map(delivery => {
                        const don = donations.find(d => d._id === delivery.donationId);
                        const req = requests.find(r => r._id === delivery.requestId);

                        if (don?.pickupLocation && req?.location) {
                            return (
                                <Polyline
                                    key={delivery._id}
                                    positions={[
                                        [don.pickupLocation.lat, don.pickupLocation.lng],
                                        [req.location.lat, req.location.lng]
                                    ]}
                                    pathOptions={{
                                        color: '#10b981',
                                        weight: 3,
                                        dashArray: '10, 10',
                                        dashOffset: '0',
                                        opacity: 0.6
                                    }}
                                />
                            );
                        }
                        return null;
                    })}

                    {filteredDonations.map(donation => {
                        const lat = donation.pickupLocation?.lat || (defaultCenter[0] + (Math.random() - 0.5) * 0.05);
                        const lng = donation.pickupLocation?.lng || (defaultCenter[1] + (Math.random() - 0.5) * 0.05);

                        if (isHeatmapView) {
                            return (
                                <CircleMarker 
                                    key={`heat-${donation._id}`} 
                                    center={[lat, lng]} 
                                    radius={25} 
                                    pathOptions={{
                                        fillColor: '#ef4444',
                                        fillOpacity: 0.35,
                                        color: 'transparent'
                                    }} 
                                />
                            );
                        }

                        return (
                            <Marker key={donation._id} position={[lat, lng]} icon={donorIcon}>
                                <Popup className="custom-popup">
                                    <div className="p-2 min-w-[200px]">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-primaryGreen">Donation</span>
                                            <span className="text-[10px] bg-primaryGreen/20 text-primaryGreen px-2 py-0.5 rounded-full font-bold">New</span>
                                        </div>
                                        <h3 className="font-black text-gray-800 text-lg mb-1">{donation.foodType}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{donation.quantity}</p>
                                        <div className="border-t border-gray-100 pt-3 flex flex-col space-y-2">
                                            <p className="text-xs font-bold text-gray-400">PICKUP LOCATION</p>
                                            <p className="text-xs font-bold text-gray-700">{donation.pickupLocation?.address || 'Available near location'}</p>
                                        </div>
                                        <button className="w-full mt-4 bg-primaryGreen text-white text-xs font-black py-2 rounded-lg shadow-lg shadow-primaryGreen/20">VIEW DETAILS</button>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}

                    {/* Requests */}
                    {filteredRequests.map(request => {
                        const lat = request.location?.lat || (defaultCenter[0] + (Math.random() - 0.5) * 0.05);
                        const lng = request.location?.lng || (defaultCenter[1] + (Math.random() - 0.5) * 0.05);

                        return (
                            <Marker key={request._id} position={[lat, lng]} icon={receiverIcon}>
                                <Popup className="custom-popup">
                                    <div className="p-2 min-w-[200px]">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-accentOrange">Request</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${request.urgency === 'high' ? 'bg-red-500 text-white' : 'bg-orange-500/20 text-orange-500'
                                                }`}>
                                                {request.urgency.toUpperCase()}
                                            </span>
                                        </div>
                                        <h3 className="font-black text-gray-800 text-lg mb-1">{request.foodTypeRequired}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{request.quantityNeeded}</p>
                                        <div className="border-t border-gray-100 pt-3 flex flex-col space-y-2">
                                            <p className="text-xs font-bold text-gray-400">DELIVERY TO</p>
                                            <p className="text-xs font-bold text-gray-700">{request.location?.address || 'See details'}</p>
                                        </div>
                                        <button className="w-full mt-4 bg-accentOrange text-white text-xs font-black py-2 rounded-lg shadow-lg shadow-accentOrange/20">DONATE NOW</button>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>

            {/* Bottom Floating Stats */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] glass px-8 py-4 rounded-full shadow-2xl flex items-center space-x-8 whitespace-nowrap"
            >
                <div className="flex flex-col items-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Donors</p>
                    <p className="text-xl font-black text-gray-800 dark:text-white">1,248</p>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex flex-col items-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Matches</p>
                    <p className="text-xl font-black text-primaryGreen">892</p>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex flex-col items-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Urgent Alerts</p>
                    <p className="text-xl font-black text-accentOrange">24</p>
                </div>
            </motion.div>
        </div>
    );
};

export default MapPage;
