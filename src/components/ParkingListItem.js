function ParkingListItem({ mapRef, setCenter, setShowModal, setCurrentFilter, parkingSite, setSelectedParkingSite }) {
    const handleDetailClick = (parkingSite) => {
        setCurrentFilter('detail');
        setSelectedParkingSite(parkingSite);
        // setCenter(parkingSite.position);
        mapRef.current.setView(parkingSite.position, 16);
    };

    const handleBookClick = (parkingSite) => {
        setShowModal(true);
        setSelectedParkingSite(parkingSite);
    };

    return (
        <div className="border px-6 py-3">
            <div>
                <div className="flex justify-between">
                    <div className="mb-2 w-4/6 text-lg font-semibold">{parkingSite.name}</div>
                    <div className="mb-2 flex items-center text-2xl font-semibold text-blue-main">
                        {parkingSite.price}
                        <span className="ml-1 text-sm">đ</span>
                    </div>
                </div>
                <div className="mb-2 text-sm font-medium text-gray-600">
                    Available: <span className="font-semibold text-gray-800">{parkingSite.availableSpot}</span>
                </div>
                <div className="mb-4 overflow-x-hidden text-sm italic text-gray-500">{parkingSite.address}</div>
                <div className="flex w-full justify-end space-x-4">
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
        </div>
    );
}

export default ParkingListItem;
