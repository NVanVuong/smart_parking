import { Marker, Popup } from 'react-leaflet';
import { parkingSiteMarker, soldOutMarker } from '../../assets/icons/index';

function ParkingMarker({ setShowModal, toggle, setToggle, setCurrentFilter, parkingSite, setSelectedParkingSite }) {
    const handleDetailClick = (parkingSite) => {
        setSelectedParkingSite(parkingSite);
        setToggle(!toggle);
        setCurrentFilter('detail');
    };

    const handleBookClick = (parkingSite) => {
        setShowModal(true);
        setSelectedParkingSite(parkingSite);
    };
    return (
        <Marker
            key={parkingSite._id}
            position={parkingSite.position}
            icon={parkingSite.availableSpot > 0 ? parkingSiteMarker : soldOutMarker}
        >
            <Popup>
                <div>
                    <div className="mb-2 flex w-52 items-center justify-between">
                        <div className="w-3/5 text-base font-semibold">{parkingSite.name}</div>
                        <div
                            className={`${
                                parkingSite.availableSpot > 0 ? 'text-blue-main' : 'text-gray-400'
                            } flex items-start text-2xl font-bold`}
                        >
                            {parkingSite.price}
                            <span className="ml-0.5 text-sm">đ</span>
                        </div>
                    </div>
                    <div className="mb-3 whitespace-nowrap text-sm font-medium text-gray-500">
                        {parkingSite.availableSpot > 0 ? (
                            <>
                                Available:{' '}
                                <span className="font-semibold text-gray-800">{parkingSite.availableSpot}</span>
                            </>
                        ) : (
                            <span className="rounded-md bg-red-600 bg-opacity-80 py-1 px-2 text-xs font-semibold text-white">
                                Sold out
                            </span>
                        )}
                    </div>
                    <div className="flex justify-between space-x-4">
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
                            className="rounded-sm py-2 px-4 font-semibold text-blue-main hover:ring-4 hover:ring-blue-main-ring active:ring-blue-main-ring "
                        >
                            Detail
                        </button>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default ParkingMarker;
