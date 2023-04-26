import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import adminApi, { category } from '~/api/adminApi';
import userApi from '~/api/userApi';
import Map from './Map';
import ParkingList from './ParkingList';
import ModalBooking from './ModalBooking';
import Toggle from './Toggle';

function MapContainer() {
    const [parkingSites, setParkingSites] = useState([]);
    const [parkingSitesNearBy, setParkingSitesNearBy] = useState([]);
    const [parkingSitesCurrent, setParkingSitesCurrent] = useState([]);
    const [position, setPosition] = useState(null);
    const [center, setCenter] = useState(null);
    const [distance, setDistance] = useState(4);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentFilter, setCurrentFilter] = useState('all');
    const [selectedParkingSite, setSelectedParkingSite] = useState(null);
    const [showModal, setShowModal] = useState('');
    const [toggle, setToggle] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve([pos.coords.latitude, pos.coords.longitude]),
                    reject,
                );
            });
            setPosition(pos);
            getParkingNearBy(pos, distance);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    const getParkingSites = async () => {
        const response = await adminApi.getAll(category.parkingsites);
        const parkingSites = response.data.data.parkingSite;

        const newParkingSites = parkingSites.map((parkingSite) => {
            const { coordinates } = parkingSite.location;
            return {
                ...parkingSite,
                address: parkingSite.location.address,
                position: { lat: coordinates[1], lng: coordinates[0] },
            };
        });
        setParkingSites(newParkingSites);
        setParkingSitesCurrent(newParkingSites);
    };

    const getParkingNearBy = async (position, distance) => {
        const response = await userApi.getParkingNearBy(position?.[0], position?.[1], distance);
        const parkingSites = response.data.data.parkingsite;

        const newParkingSites = parkingSites.map((parkingSite) => {
            const { coordinates } = parkingSite.location;
            return {
                ...parkingSite,
                address: parkingSite.location.address,
                position: { lat: coordinates[1], lng: coordinates[0] },
            };
        });
        setParkingSitesNearBy(newParkingSites);
    };

    const handleSearch = async (searchKeyword) => {
        const response = await userApi.searchParkingSite(searchKeyword);
        const parkingSites = response.data.data.parkingsite;

        const newParkingSites = parkingSites.map((parkingSite) => {
            const { coordinates } = parkingSite.location;
            return {
                ...parkingSite,
                address: parkingSite.location.address,
                position: { lat: coordinates[1], lng: coordinates[0] },
            };
        });
        setParkingSites(newParkingSites);
    };

    useEffect(() => {
        getParkingSites();
    }, []);

    useEffect(() => {
        setParkingSitesCurrent(
            currentFilter === 'closest'
                ? parkingSitesNearBy
                : currentFilter === 'all'
                ? parkingSites
                : parkingSitesCurrent,
        );
    }, [currentFilter, parkingSitesNearBy, parkingSites, parkingSitesCurrent]);

    return (
        <div className="relative flex max-h-full flex-1 grow flex-col overflow-hidden md:flex-row">
            <ToastContainer />
            <ModalBooking parkingSite={selectedParkingSite} showModal={showModal} setShowModal={setShowModal} />
            <Toggle toggle={toggle} setToggle={setToggle} />
            <ParkingList
                mapRef={mapRef}
                toggle={toggle}
                setCenter={setCenter}
                searchKeyword={searchKeyword}
                handleSearch={handleSearch}
                setSearchKeyword={setSearchKeyword}
                setShowModal={setShowModal}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                parkingSites={parkingSites}
                parkingSitesNearBy={parkingSitesNearBy}
                parkingSitesCurrent={parkingSitesCurrent}
                selectedParkingSite={selectedParkingSite}
                setSelectedParkingSite={setSelectedParkingSite}
            />
            <Map
                mapRef={mapRef}
                toggle={toggle}
                setToggle={setToggle}
                position={position}
                setPosition={setPosition}
                distance={distance}
                setDistance={setDistance}
                center={center}
                setCenter={setCenter}
                setShowModal={setShowModal}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                getParkingNearBy={getParkingNearBy}
                parkingSitesCurrent={parkingSitesCurrent}
                setSelectedParkingSite={setSelectedParkingSite}
            />
        </div>
    );
}
export default MapContainer;
