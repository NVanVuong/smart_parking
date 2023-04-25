import ParkingListItem from './ParkingListItem';
import ParkingListItemDetail from './ParkingListItemDetail';
import SearchUser from './SearchUser';

function ParkingList({
    mapRef,
    toggle,
    searchKeyword,
    setSearchKeyword,
    handleSearch,
    setShowModal,
    currentFilter,
    setCurrentFilter,
    parkingSites,
    parkingSitesNearBy,
    parkingSitesCurrent,
    selectedParkingSite,
    setSelectedParkingSite,
}) {
    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    const renderParkingListItems = () => {
        switch (currentFilter) {
            case 'all':
                return parkingSites.map((parkingSite) => (
                    <ParkingListItem
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
                    <ParkingListItem
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
                    <ParkingListItem
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
                        <ParkingListItemDetail setShowModal={setShowModal} parkingSite={selectedParkingSite} />
                    )
                );
            default:
                return null;
        }
    };

    return (
        <div className={`${toggle ? 'hidden' : 'block'} relative h-full w-full overflow-y-hidden md:block md:w-2/5`}>
            <SearchUser searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} handleSearch={handleSearch} />
            <ul className="flex h-10 items-end justify-center space-x-4 border-b px-4 pb-1.5">
                <li
                    className={`${
                        currentFilter === 'all' ? ' border-blue-main ' : 'border-transparent '
                    }  cursor-pointer border-b-2 px-2 pb-1 text-sm font-medium text-gray-500 transition-all duration-500 hover:text-blue-main`}
                    onClick={() => handleFilterChange('all')}
                >
                    View all
                </li>
                <li
                    className={`${
                        currentFilter === 'closest' ? 'border-blue-main ' : 'border-transparent'
                    } cursor-pointer border-b-2 px-2 pb-1 text-sm font-medium  text-gray-500 transition-all duration-500 hover:text-blue-main `}
                    onClick={() => handleFilterChange('closest')}
                >
                    Closest
                </li>
                <li
                    className={`${
                        currentFilter === 'cheapest' ? 'border-blue-main ' : 'border-transparent'
                    } cursor-pointer border-b-2 px-2 pb-1 text-sm font-medium  text-gray-500 transition-all duration-500 hover:text-blue-main `}
                    onClick={() => handleFilterChange('cheapest')}
                >
                    Cheapest
                </li>
                <li
                    className={`${
                        currentFilter === 'detail' ? 'border-blue-main ' : 'border-transparent'
                    } pointer-events-none cursor-pointer border-b-2  px-2 pb-1 text-sm font-medium  text-gray-500 transition-all duration-500 hover:text-blue-main`}
                    onClick={() => handleFilterChange('detail')}
                >
                    Detail
                </li>
            </ul>
            <div className="h-full overflow-y-auto pb-28">{renderParkingListItems()}</div>
        </div>
    );
}

export default ParkingList;
