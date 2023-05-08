import { BiHandicap } from 'react-icons/bi';
import { GiHomeGarage, GiCctvCamera } from 'react-icons/gi';
import { FaChargingStation, FaCarAlt } from 'react-icons/fa';
import { MdOutlineMobileFriendly } from 'react-icons/md';
import { AiOutlineScan } from 'react-icons/ai';

function ParkingDetail({ setShowModal, parkingSite, setSelectedParkingSite }) {
    const handleBookClick = (parkingSite) => {
        setShowModal(true);
        setSelectedParkingSite(parkingSite);
    };

    return (
        <div className="relative flex h-full w-full flex-col overflow-y-scroll rounded-lg border p-6 pb-4">
            <div className="mb-2 flex justify-between">
                <h2 className="w-3/5 text-lg font-bold text-gray-800">{parkingSite.name}</h2>
                <span
                    className={`${
                        parkingSite.availableSpot > 0 ? 'text-blue-main' : 'text-gray-400'
                    } flex items-start text-3xl font-semibold `}
                >
                    {parkingSite.price}
                    <span className="ml-1 text-base">đ</span>
                </span>
            </div>
            <div className="pb-6 text-sm italic text-gray-500">{parkingSite.address}</div>
            <hr />
            <div className="relative pt-6 text-justify text-gray-500">
                <p className="block text-lg font-bold text-gray-800">About This Facility</p>
                <p className="mt-3 text-sm  font-medium text-gray-500">{parkingSite.description}</p>
                <div className="absolute top-6 right-0 text-sm font-medium text-gray-500">
                    {parkingSite.availableSpot > 0 ? (
                        <>
                            Available: <span className="font-semibold text-gray-800">{parkingSite.availableSpot}</span>
                        </>
                    ) : (
                        <span className="rounded-md bg-red-600 bg-opacity-80 py-1 px-2 font-semibold text-white">
                            Sold out
                        </span>
                    )}
                </div>
            </div>
            <div className="mt-3 text-sm font-medium text-gray-500">
                Hours of Operation: <span className="mr-1 font-semibold text-gray-800"> Mon - Sun 24 hours</span>
            </div>
            <div className="grid grid-cols-4 items-center justify-center py-8 text-gray-600">
                <div className="flex flex-col items-center justify-center">
                    <GiCctvCamera />
                    <p className="mt-1 text-xs">Security</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <GiHomeGarage />
                    <p className="mt-1 text-xs">Indoor</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <FaChargingStation />
                    <p className="mt-1 text-xs">Charging</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <BiHandicap />
                    <p className="mt-1 text-xs">Handicap</p>
                </div>
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center pt-4 pb-2">
                <p className="mb-3 text-lg font-bold text-gray-800">How to Park</p>
                <div className="flex items-start justify-around">
                    <div className="flex w-1/3 flex-col items-center p-2">
                        <div className="w-fit rounded-full bg-gray-100 p-4 text-2xl text-blue-main">
                            <MdOutlineMobileFriendly />
                        </div>
                        <span className="mt-4 text-center text-xs font-semibold text-gray-500">
                            1. Book a parking site
                        </span>
                    </div>
                    <div className="flex w-1/3 flex-col items-center p-2">
                        <div className="w-fit rounded-full bg-gray-100 p-4 text-2xl text-blue-main">
                            <AiOutlineScan />
                        </div>
                        <span className="mt-4 text-center text-xs font-semibold text-gray-500">
                            2. Scan license plates
                        </span>
                    </div>
                    <div className="flex w-1/3 flex-col items-center p-2">
                        <div className="w-fit rounded-full bg-gray-100 p-4 text-2xl text-blue-main">
                            <FaCarAlt />
                        </div>
                        <span className=" mt-4 text-center text-xs font-semibold text-gray-500">
                            3. Park in any space is available
                        </span>
                    </div>
                </div>
            </div>
            <button
                onClick={() => handleBookClick(parkingSite)}
                className={`${
                    parkingSite.availableSpot > 0 ? 'bg-blue-main' : 'pointer-events-none bg-gray-400'
                } sticky bottom-0 w-full transform rounded-md p-4 font-bold text-white shadow-2xl hover:bg-blue-main-hover hover:ring-4 hover:ring-blue-main-ring active:ring-blue-main-ring`}
            >
                Book now
            </button>
        </div>
    );
}

export default ParkingDetail;
