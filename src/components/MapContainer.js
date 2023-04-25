import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { FaRegListAlt } from 'react-icons/fa';
import { TbMap2 } from 'react-icons/tb';
import adminApi, { category } from '~/api/adminApi';
import userApi from '~/api/userApi';
import Map from './Map';
import ParkingList from './ParkingList';
import ModalBooking from './ModalBooking';

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
    const [toogle, setToggle] = useState(false);
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
        <div className="flex max-h-full flex-1 grow flex-col overflow-hidden md:flex-row">
            <ToastContainer />
            <ModalBooking parkingSite={selectedParkingSite} showModal={showModal} setShowModal={setShowModal} />
            <div className="block md:hidden">
                {toogle ? (
                    <span
                        onClick={() => setToggle(!toogle)}
                        className="flex items-center justify-center text-blue-main"
                    >
                        {' '}
                        <FaRegListAlt />{' '}
                        <span className="ml-2 cursor-pointer py-2.5 text-xs font-semibold">LIST VIEW</span>
                    </span>
                ) : (
                    <span
                        onClick={() => setToggle(!toogle)}
                        className="flex items-center justify-center text-blue-main"
                    >
                        {' '}
                        <TbMap2 /> <span className="ml-2 cursor-pointer py-2.5 text-xs font-semibold">VIEW IN MAP</span>
                    </span>
                )}
            </div>
            <ParkingList
                mapRef={mapRef}
                toggle={toogle}
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
                toggle={toogle}
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
