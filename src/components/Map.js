import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { icon, iconHere } from '../ultils/contains';
function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [center, setCenter] = useState(null);
    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng);
            if (!center) {
                setCenter(e.latlng);
                map.setView(e.latlng, map.getZoom());
            }
        },
        // console.log();
        // click(e) {
        //     setCenter(e.latlng);
        //     console.log(e.latlng);
        //     map.setView(e.latlng, map.getZoom());
        // },
    });

    useEffect(() => {
        map.locate();
    }, []);

    return position === null ? null : (
        <>
            <Marker position={position} icon={iconHere}>
                <Popup>You are here</Popup>
            </Marker>
            {center && (
                <Marker position={center} icon={iconHere}>
                    <Popup>Center of the map</Popup>
                </Marker>
            )}
        </>
    );
}

export default function Map({ setShowModal, setCurrentFilter, parkingSites, setSelectedParkingSite }) {
    const handleDetailClick = (parkingSite) => {
        setSelectedParkingSite(parkingSite);
        setCurrentFilter('detail');
    };

    const handleBookClick = (parkingSite) => {
        setShowModal(true);
        setSelectedParkingSite(parkingSite);
    };
    return (
        <MapContainer center={{ lat: 16.054590230975684, lng: 108.20170384137039 }} zoom={14} scrollWheelZoom>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {parkingSites.map((parkingSite) => {
                return (
                    <Marker key={parkingSite._id} position={[parkingSite.lat, parkingSite.lng]} icon={icon}>
                        <Popup>
                            <div>
                                <div className="mb-2 flex w-52 justify-between">
                                    <div className="w-3/5 text-base font-semibold">{parkingSite.name}</div>
                                    <div className="flex items-center text-2xl font-bold text-blue-main">
                                        {parkingSite.price}
                                        <span className="ml-0.5 text-sm">đ</span>
                                    </div>
                                </div>
                                <div className="mb-3 whitespace-nowrap text-sm font-medium text-gray-500">
                                    Available:{' '}
                                    <span className="font-semibold text-gray-800">{parkingSite.availableSpot}</span>
                                </div>
                                <div className="flex justify-between space-x-4">
                                    <button
                                        onClick={() => handleBookClick(parkingSite)}
                                        className="rounded-sm bg-blue-main py-2 px-6 font-semibold text-white shadow-md hover:bg-blue-main-hover hover:ring-4 hover:ring-blue-main-ring active:ring-blue-main-ring"
                                    >
                                        Book now
                                    </button>
                                    <button
                                        onClick={() => handleDetailClick(parkingSite)}
                                        className="rounded-sm py-2 px-4 font-semibold text-blue-main hover:ring-4 hover:ring-blue-main-ring active:ring-blue-main-ring "
                                    >
                                        Detail
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
            <LocationMarker />
        </MapContainer>
    );
}
