import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import { mapMarkers } from '../data/mockData';
import { ExternalLink, MapPin } from 'lucide-react';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

import MarkerClusterGroup from 'react-leaflet-cluster';

// ... (previous imports)

const LeafletMap = ({ markers, onMarkerClick }) => {
    const position = [-2.5489, 118.0149]; // Center of Indonesia
    const displayMarkers = markers || mapMarkers;

    return (
        <MapContainer center={position} zoom={5} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup
                chunkedLoading
                spiderfyOnMaxZoom={true}
            >
                {displayMarkers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        eventHandlers={{
                            click: () => {
                                if (onMarkerClick) {
                                    onMarkerClick(marker);
                                }
                            },
                        }}
                    >
                        <Popup className="custom-popup" maxWidth={300}>
                            <div className="p-1">
                                <h3 className="text-teal-700 font-bold text-base mb-2 leading-tight">
                                    {marker.title}
                                </h3>

                                <div className="mb-3 text-sm font-medium text-gray-700">
                                    {marker.demographics}
                                </div>

                                <p className="text-gray-600 text-sm mb-3 leading-snug">
                                    {marker.description}
                                </p>

                                <div className="mb-3">
                                    <img
                                        src={marker.image}
                                        alt="Evidence"
                                        className="w-24 h-24 object-cover rounded-md border border-gray-200"
                                    />
                                </div>

                                <div className="bg-gray-50 p-2 rounded text-xs text-teal-600 flex items-center gap-1">
                                    <MapPin size={12} />
                                    <a href={`https://www.google.com/maps?q=${marker.position[0]},${marker.position[1]}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                        {marker.originalCoords} <ExternalLink size={10} />
                                    </a>
                                </div>
                                <div className="text-xs text-gray-400 mt-1 italic">
                                    Koordinat asli telah disamarkan
                                </div>

                                {onMarkerClick && (
                                    <button
                                        onClick={() => onMarkerClick(marker)}
                                        className="mt-2 w-full bg-teal-600 text-white text-xs py-1 rounded hover:bg-teal-700 transition"
                                    >
                                        Edit Report
                                    </button>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default LeafletMap;
