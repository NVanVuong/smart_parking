import Search from './Search';
// import ParkingList from './ParkingList';
import ParkingNav from './ParkingNav';

import { lazy, Suspense } from 'react';
import Loading from '../common/Loading';
const ParkingList = lazy(() => import('./ParkingList'));

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
    parkingSitesNearBy,
    parkingSitesCurrent,
    selectedParkingSite,
    setSelectedParkingSite,
}) {
    return (
        <div
            className={`${
                toggle ? 'hidden' : 'block'
            } relative h-full w-full overflow-y-hidden md:block md:w-2/3 xl:w-2/5`}
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
            <Suspense fallback={<Loading />}>
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
            </Suspense>
        </div>
    );
}

export default ParkingWrapper;
