import { useState, useEffect } from 'react';
import Map from './Map';
import ParkingList from './ParkingList';
import adminApi, { category } from '~/api/adminApi';
import ModalBooking from './ModalBooking';

function MapContainer() {
    const [parkingSites, setParkingSites] = useState([]);
    const [selectedParkingSite, setSelectedParkingSite] = useState(null);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [showModal, setShowModal] = useState('');

    useEffect(() => {
        getParkingSites();
    }, []);

    const getParkingSites = async () => {
        const response = await adminApi.getAll(category.parkingsites);
        const parkingSites = response.data.data.parkingSite;

        const newParkingSites = parkingSites.map((parkingSite) => ({
            ...parkingSite,
            address: parkingSite.location.address,
            lat: parkingSite.location.coordinates[1],
            lng: parkingSite.location.coordinates[0],
        }));

        setParkingSites(newParkingSites);
    };

    return (
        <div className="flex max-h-full flex-1 grow overflow-hidden">
            <ModalBooking parkingSite={selectedParkingSite} showModal={showModal} setShowModal={setShowModal} />
            <ParkingList
                setShowModal={setShowModal}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                parkingSites={parkingSites}
                selectedParkingSite={selectedParkingSite}
                setSelectedParkingSite={setSelectedParkingSite}
            />
            <Map
                setShowModal={setShowModal}
                setCurrentFilter={setCurrentFilter}
                parkingSites={parkingSites}
                setSelectedParkingSite={setSelectedParkingSite}
            />
        </div>
    );
}
export default MapContainer;
