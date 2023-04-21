import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { BiCurrentLocation } from 'react-icons/bi';
import ParkingSiteMarker from './ParkingSiteMarker';
import LocationMarker from './LocationMarker';
import FilterDistance from './FilterDistance';

function Map({
    mapRef,
    position,
    setPosition,
    distance,
    setDistance,
    center,
    setCenter,
    setShowModal,
    currentFilter,
    setCurrentFilter,
    parkingSitesCurrent,
    getParkingNearBy,
    setSelectedParkingSite,
}) {
    const [showRadius, setShowRadius] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const handleLocationIconClick = () => {
        setCenter(position);
        console.log(position);
        getParkingNearBy([position[0], position[1]], distance);
        if (mapRef.current) {
            mapRef.current.setView(position, 14);
        }
    };

    const handleSetMapZoomLevel = (filter) => {
        if (mapRef.current) {
            if (filter === 'all') {
                mapRef.current.setView(position, 13);
            } else if (filter === 'closest') {
                mapRef.current.setView(position, 14);
            }
        }
    };

    useEffect(() => {
        handleSetMapZoomLevel(currentFilter);
        // eslint-disable-next-line
    }, [currentFilter]);

    return (
        <div className="relative h-full w-full">
            <MapContainer ref={mapRef} center={position || [0, 0]} zoom={14} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {parkingSitesCurrent.map((parkingSite) => (
                    <ParkingSiteMarker
                        key={parkingSite._id}
                        parkingSite={parkingSite}
                        setShowModal={setShowModal}
                        setCurrentFilter={setCurrentFilter}
                        setSelectedParkingSite={setSelectedParkingSite}
                    />
                ))}
                <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    center={center}
                    setCenter={setCenter}
                    getParkingNearBy={getParkingNearBy}
                    distance={distance}
                    showRadius={showRadius}
                />
            </MapContainer>
            <BiCurrentLocation
                onClick={() => handleLocationIconClick()}
                className="absolute top-[76px] z-[9999] ml-[10.5px] cursor-pointer rounded border-2 border-[#0003] bg-white p-1 text-[33px] text-red-500"
            />
            <FilterDistance
                showRadius={showRadius}
                setShowRadius={setShowRadius}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                distance={distance}
                setDistance={setDistance}
                center={center}
                setCurrentFilter={setCurrentFilter}
                getParkingNearBy={getParkingNearBy}
            />
        </div>
    );
}

export default Map;
