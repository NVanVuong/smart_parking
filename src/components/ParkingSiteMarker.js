import { Marker, Popup } from 'react-leaflet';
import { parkingSiteMarker } from '../assets/icons/index';

function ParkingSiteMarker({ setShowModal, toggle, setToggle, setCurrentFilter, parkingSite, setSelectedParkingSite }) {
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
        <Marker key={parkingSite._id} position={parkingSite.position} icon={parkingSiteMarker}>
            <Popup>
                <div>
                    <div className="mb-2 flex w-52 items-center justify-between">
                        <div className="w-3/5 text-base font-semibold">{parkingSite.name}</div>
                        <div className="flex items-start text-2xl font-bold text-blue-main">
                            {parkingSite.price}
                            <span className="ml-0.5 text-sm">đ</span>
                        </div>
                    </div>
                    <div className="mb-3 whitespace-nowrap text-sm font-medium text-gray-500">
                        Available: <span className="font-semibold text-gray-800">{parkingSite.availableSpot}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
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
            </Popup>
        </Marker>
    );
}

export default ParkingSiteMarker;
