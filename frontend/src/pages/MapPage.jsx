import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

// Fix leafet default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons based on roles
const donorIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const receiverIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapPage = () => {
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);

    // Default center (San Francisco roughly)
    const defaultCenter = [37.7749, -122.4194];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const donationsRes = await axios.get('http://localhost:5000/api/donations');
                const requestsRes = await axios.get('http://localhost:5000/api/requests');

                setDonations(donationsRes.data.filter(d => d.status === 'available'));
                setRequests(requestsRes.data.filter(r => r.status === 'pending'));
            } catch (error) {
                console.error("Error fetching map data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="bg-white shadow p-4 z-10">
                <h2 className="text-xl font-bold text-gray-800">Live Map: Food Donations & Requests</h2>
                <div className="mt-2 flex space-x-4 text-sm">
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        <span>Available Donations</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                        <span>Pending Requests</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full relative z-0">
                <MapContainer
                    center={defaultCenter}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Plot Donations */}
                    {donations.map(donation => {
                        // Check if coordinates exist (mocking since we aren't geocoding addresses right now)
                        const lat = donation.pickupLocation?.lat || (defaultCenter[0] + (Math.random() - 0.5) * 0.1);
                        const lng = donation.pickupLocation?.lng || (defaultCenter[1] + (Math.random() - 0.5) * 0.1);

                        return (
                            <Marker key={donation._id} position={[lat, lng]} icon={donorIcon}>
                                <Popup>
                                    <div className="p-1">
                                        <h3 className="font-bold text-primary-green">{donation.foodType}</h3>
                                        <p className="text-sm my-1"><span className="font-semibold">Quantity:</span> {donation.quantity}</p>
                                        <p className="text-sm my-1"><span className="font-semibold">Address:</span> {donation.pickupLocation?.address}</p>
                                        <p className="text-xs text-gray-500 mt-2">Expires: {new Date(donation.expiryTime).toLocaleTimeString()}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}

                    {/* Plot Requests */}
                    {requests.map(request => {
                        const lat = request.location?.lat || (defaultCenter[0] + (Math.random() - 0.5) * 0.1);
                        const lng = request.location?.lng || (defaultCenter[1] + (Math.random() - 0.5) * 0.1);

                        return (
                            <Marker key={request._id} position={[lat, lng]} icon={receiverIcon}>
                                <Popup>
                                    <div className="p-1">
                                        <h3 className="font-bold text-accent-orange">Needs: {request.foodTypeRequired}</h3>
                                        <p className="text-sm my-1"><span className="font-semibold">Quantity:</span> {request.quantityNeeded}</p>
                                        <p className="text-sm my-1"><span className="font-semibold">Address:</span> {request.location?.address}</p>
                                        <div className="mt-2 text-xs">
                                            <span className={`px-2 py-1 rounded text-white ${request.urgency === 'high' ? 'bg-red-500' :
                                                    request.urgency === 'medium' ? 'bg-orange-400' : 'bg-green-400'
                                                }`}>
                                                Urgency: {request.urgency}
                                            </span>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapPage;
