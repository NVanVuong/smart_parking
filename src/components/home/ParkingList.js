import ParkingItem from './ParkingItem';
import ParkingDetail from './ParkingDetail';

function ParkingList({
    mapRef,
    setShowModal,
    currentFilter,
    setCurrentFilter,
    parkingSites,
    parkingSitesNearBy,
    parkingSitesCurrent,
    selectedParkingSite,
    setSelectedParkingSite,
}) {
    const renderParkingListItems = () => {
        switch (currentFilter) {
            case 'all':
                return parkingSites.map((parkingSite) => (
                    <ParkingItem
                        mapRef={mapRef}
                        key={parkingSite._id}
                        setShowModal={setShowModal}
                        currentFilter={currentFilter}
                        setCurrentFilter={setCurrentFilter}
                        parkingSite={parkingSite}
                        setSelectedParkingSite={setSelectedParkingSite}
                    />
                ));
            case 'closest':
                return parkingSitesNearBy.map((parkingSite) => (
                    <ParkingItem
                        mapRef={mapRef}
                        key={parkingSite._id}
                        setShowModal={setShowModal}
                        currentFilter={currentFilter}
                        setCurrentFilter={setCurrentFilter}
                        parkingSite={parkingSite}
                        setSelectedParkingSite={setSelectedParkingSite}
                    />
                ));
            case 'cheapest':
                const sortedParkingSites = parkingSitesCurrent.slice().sort((a, b) => a.price - b.price);
                return sortedParkingSites.map((parkingSite) => (
                    <ParkingItem
                        mapRef={mapRef}
                        key={parkingSite._id}
                        setShowModal={setShowModal}
                        currentFilter={currentFilter}
                        setCurrentFilter={setCurrentFilter}
                        parkingSite={parkingSite}
                        setSelectedParkingSite={setSelectedParkingSite}
                    />
                ));
            case 'detail':
                return (
                    selectedParkingSite && (
                        <ParkingDetail setShowModal={setShowModal} parkingSite={selectedParkingSite} />
                    )
                );
            default:
                return null;
        }
    };

    return <div className="h-full overflow-y-auto">{renderParkingListItems()}</div>;
}

export default ParkingList;
