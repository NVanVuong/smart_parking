import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { BiCurrentLocation } from 'react-icons/bi';
import ParkingMarker from './ParkingMarker';
import LocationMarker from './LocationMarker';
import FilterDistance from '../filter/FilterDistance';
function Map({
    mapRef,
    toggle,
    setToggle,
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
        getParkingNearBy([position.lat, position.lng], distance);
        if (mapRef.current) {
            mapRef.current.flyTo(position, 14);
        }
    };

    const handleSetMapZoomLevel = (filter) => {
        if (mapRef.current) {
            if (filter === 'all') {
                mapRef.current.setView(center, 13);
            } else if (filter === 'closest') {
                mapRef.current.setView(center, 14);
            }
        }
    };

    useEffect(() => {
        handleSetMapZoomLevel(currentFilter);
        // eslint-disable-next-line
    }, [currentFilter]);

    return (
        <div className={`${!toggle ? 'hidden' : 'block'} relative h-full w-full md:block`}>
            <MapContainer ref={mapRef} center={position || [0, 0]} zoom={13} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {parkingSitesCurrent.map((parkingSite) => (
                    <ParkingMarker
                        key={parkingSite._id}
                        toggle={toggle}
                        setToggle={setToggle}
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
