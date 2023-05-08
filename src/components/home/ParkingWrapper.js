import Loading from './Loading';
import Search from './Search';
import ParkingNav from './ParkingNav';
import ParkingList from './ParkingList';

function ParkingWrapper({
    mapRef,
    toggle,
    searchKeyword,
    setCenter,
    setSearchKeyword,
    handleSearch,
    setShowModal,
    currentFilter,
    setCurrentFilter,
    parkingSites,
    getParkingNearBy,
    distance,
    loading,
    parkingSitesNearBy,
    parkingSitesCurrent,
    selectedParkingSite,
    setSelectedParkingSite,
}) {
    return (
        <div
            className={`${
                toggle ? 'hidden' : 'block'
            } relative h-full w-full overflow-y-hidden pb-28 md:block md:w-2/3 xl:w-2/5`}
        >
            <Search
                mapRef={mapRef}
                getParkingNearBy={getParkingNearBy}
                setCurrentFilter={setCurrentFilter}
                distance={distance}
                setCenter={setCenter}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                handleSearch={handleSearch}
            />
            <ParkingNav currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
            {!loading ? (
                <ParkingList
                    mapRef={mapRef}
                    setShowModal={setShowModal}
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                    parkingSites={parkingSites}
                    parkingSitesNearBy={parkingSitesNearBy}
                    parkingSitesCurrent={parkingSitesCurrent}
                    selectedParkingSite={selectedParkingSite}
                    setSelectedParkingSite={setSelectedParkingSite}
                />
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default ParkingWrapper;
