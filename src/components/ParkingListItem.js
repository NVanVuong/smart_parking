function ParkingListItem({ mapRef, setShowModal, setCurrentFilter, parkingSite, setSelectedParkingSite }) {
    const handleDetailClick = (parkingSite) => {
        setCurrentFilter('detail');
        setSelectedParkingSite(parkingSite);
        mapRef.current.flyTo(parkingSite.position, 16);
    };

    const handleBookClick = (parkingSite) => {
        setShowModal(true);
        setSelectedParkingSite(parkingSite);
    };

    return (
        <div className="relative border px-6 py-3">
            <div
                className={`${
                    parkingSite.availableSpot > 0 ? 'hidden' : 'block'
                } absolute inset-0 w-full bg-gray-200 bg-opacity-40`}
            ></div>
            <div>
                <div className="flex justify-between">
                    <div className="mb-2 w-4/6 text-lg font-semibold">{parkingSite.name}</div>
                    <div
                        className={`${
                            parkingSite.availableSpot > 0 ? 'text-blue-main' : 'text-gray-400'
                        } mb-2 flex items-center text-2xl font-semibold text-blue-main`}
                    >
                        {parkingSite.price}
                        <span className="ml-1 text-sm">đ</span>
                    </div>
                </div>
                <div
                    className={`mb-2 w-fit rounded-md p-1 px-2 text-sm font-medium text-gray-600 ${
                        parkingSite.availableSpot > 0
                            ? 'bg-blue-main bg-opacity-20'
                            : 'bg-red-600 bg-opacity-80 text-white'
                    }`}
                >
                    {parkingSite.availableSpot > 0 ? (
                        <>
                            Available: <span className="font-semibold text-gray-800">{parkingSite.availableSpot}</span>
                        </>
                    ) : (
                        'Sold out'
                    )}
                </div>

                <div className="mb-4 overflow-x-hidden text-sm italic text-gray-500">{parkingSite.address}</div>
                <div className="flex w-full justify-end space-x-4">
                    <button
                        onClick={() => handleBookClick(parkingSite)}
                        className={`${
                            parkingSite.availableSpot > 0 ? 'bg-blue-main' : 'pointer-events-none bg-gray-400'
                        } rounded-sm  py-2 px-6 font-semibold text-white shadow-md hover:bg-blue-main-hover hover:ring-4 hover:ring-blue-main-ring active:ring-blue-main-ring`}
                    >
                        Book now
                    </button>
                    <button
                        onClick={() => handleDetailClick(parkingSite)}
                        className="z-50 rounded-sm py-2 px-4 font-semibold text-blue-main hover:ring-4 hover:ring-blue-main-ring active:ring-blue-main-ring "
                    >
                        Detail
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ParkingListItem;
