import { useState, useEffect } from 'react';
import { Info } from '@phosphor-icons/react';
import Loading from './Loading';
import Pagination from './Pagination';
import userApi from '~/api/userApi';
import SearchProfile from './SearchProfile';
import ModalReservation from './ModalReservation';

function Reservation({ auth }) {
    const [reservations, setReservations] = useState([]);
    const [currentReservation, setCurrentReservation] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationPerPage] = useState(8);
    const indexOfLastReservation = currentPage * reservationPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationPerPage;
    const totalReservation = reservations.length;
    const totalPages = Math.ceil(totalReservation / reservationPerPage);
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = async () => {
        const response = await userApi.getMyReservation();
        const reservations = response.data.data.reservation.reverse();
        setReservations(reservations);
        setLoading(false);
    };

    const handleSearch = async (searchKeyword) => {
        const response = await userApi.searchMyReservation(searchKeyword);
        setReservations(response.data.data.reservations.reverse());
    };

    const handleModal = (reservation) => {
        setShowModal(!showModal);
        setCurrentReservation(reservation);
    };

    return !loading ? (
        <div className="relative flex grow flex-col overflow-hidden overscroll-none">
            <ModalReservation showModal={showModal} setShowModal={setShowModal} reservation={currentReservation} />
            <div className="mb-3 flex h-12 items-center justify-between border-b-2 border-gray-200 focus-within:border-b-2 focus-within:border-blue-main focus-within:shadow-md md:mb-5 md:h-16">
                <SearchProfile
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    handleSearch={handleSearch}
                />
            </div>
            <div className="mx-4 border border-gray-200 shadow sm:rounded-lg md:mx-8">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="grid grid-cols-6 md:grid-cols-12">
                            <th
                                scope="col"
                                className="col-span-4 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Reserving Time
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Entering Time
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Number Plate
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                {/* Action */}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {currentReservations.map((reservation) => (
                            <tr
                                key={reservation._id}
                                className="group grid grid-cols-6 hover:bg-gray-50 md:grid-cols-12"
                            >
                                <td className="col-span-4 whitespace-nowrap  py-4 px-3 md:px-6">
                                    <div className="overflow-hidden text-left text-sm font-medium text-gray-900 group-hover:text-blue-main">
                                        {reservation.parkingSite?.name || reservation.parkingSite[0]?.name}
                                    </div>
                                </td>
                                <td className="col-span-1 whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-right text-sm text-gray-500">
                                        {reservation.parkingSite?.price || reservation.parkingSite[0]?.price}đ
                                    </div>
                                </td>
                                <td className="col-span-2 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-right text-sm text-gray-500">
                                        {reservation?.reservingTime.slice(0, 10)}
                                    </div>
                                </td>
                                <td className="col-span-2 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-right text-sm text-gray-500">
                                        {reservation?.enteringTime ? reservation?.enteringTime.slice(0, 10) : '---'}
                                    </div>
                                </td>
                                <td className="col-span-2 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-right text-sm text-gray-500">{reservation.lpNumber}</div>
                                </td>
                                <td className="col-span-1 mr-4 flex items-center justify-end whitespace-nowrap text-sm font-medium md:invisible md:mr-0 md:justify-center md:group-hover:visible">
                                    <button
                                        onClick={() => handleModal(reservation)}
                                        className="text-lg text-gray-400 transition duration-300 hover:scale-110 hover:text-sky-400 hover:drop-shadow-md md:text-xl"
                                    >
                                        <Info weight="bold" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <Pagination
                    items={reservations}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default Reservation;
