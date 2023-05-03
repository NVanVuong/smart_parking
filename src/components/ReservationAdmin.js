import { useState, useEffect } from 'react';
import { useAuth } from '~/hooks/auth';
import { Info } from '@phosphor-icons/react';
import Loading from './Loading';
import Pagination from './Pagination';
import SearchAdmin from './SearchAdmin';
import ModalReservation from './ModalReservation';
import AccountBadge from './AccountBadge';
import { category } from '~/api/adminApi';
import adminApi from '~/api/adminApi';

function ReservationAdmin() {
    const auth = useAuth();
    const [reservations, setReservations] = useState([]);
    const [currentReservation, setCurrentReservation] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationPerPage] = useState(9);
    const indexOfLastReservation = currentPage * reservationPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationPerPage;
    const totalReservation = reservations.length;
    const totalPages = Math.ceil(totalReservation / reservationPerPage);
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = async () => {
        const response = await adminApi.getAll(category.reservation);
        const reservations = response.data.data.data.reverse();
        setReservations(reservations);
        setLoading(false);
    };

    const handleSearch = async (searchKeyword) => {
        const response = await adminApi.searchReservation(searchKeyword);
        setReservations(response.data.data.reservations.reverse());
    };

    const handleModal = (reservation) => {
        setShowModal(!showModal);
        setCurrentReservation(reservation);
    };

    return !loading ? (
        <div className="relative flex grow flex-col overflow-hidden overscroll-none">
            <ModalReservation
                auth={auth}
                showModal={showModal}
                setShowModal={setShowModal}
                reservation={currentReservation}
            />
            <div className="mb-3 flex h-14 items-center justify-between border-b-2 border-gray-200 pr-4 focus-within:border-b-2 focus-within:border-blue-main focus-within:shadow-md md:mb-5 md:h-16 md:pr-8">
                <SearchAdmin
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    handleSearch={handleSearch}
                />
                <span className="mx-2 h-9 border md:mx-4"></span>
                <AccountBadge auth={auth} />
            </div>
            <div className="mx-4 border border-gray-200 shadow sm:rounded-lg md:mx-8 md:mt-4">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="grid grid-cols-7 md:grid-cols-9">
                            <th
                                scope="col"
                                className="col-span-4 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:col-span-3 md:px-6"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:col-span-1 md:block md:px-6 md:text-right"
                            >
                                Account
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block "
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Reserving
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Entering
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
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
                                className="group grid grid-cols-7 hover:bg-gray-50 md:grid-cols-9"
                            >
                                <td className="col-span-4 whitespace-nowrap py-4 px-3 md:col-span-3 md:px-6">
                                    <div className="overflow-hidden text-left text-sm font-medium text-gray-900 group-hover:text-blue-main">
                                        {reservation?.parkingSite?.name || reservation?.parkingSite[0]?.name || '---'}
                                    </div>
                                </td>
                                <td className="col-span-2 whitespace-nowrap py-4 md:col-span-1 md:block md:px-6">
                                    <div className="overflow-hidden text-left text-sm text-gray-500 md:text-right">
                                        {reservation?.account?.username || reservation?.account[0]?.username}
                                    </div>
                                </td>
                                <td className="col-span-1 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-right text-sm text-gray-500">
                                        {reservation?.parkingSite?.price || reservation?.parkingSite[0]?.price}đ
                                    </div>
                                </td>
                                <td className="col-span-1 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-right text-sm text-gray-500">
                                        {reservation?.reservingTime?.slice(0, 10)}
                                    </div>
                                </td>
                                <td className="col-span-1 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-right text-sm text-gray-500">
                                        {reservation?.enteringTime ? reservation?.enteringTime?.slice(0, 10) : '---'}
                                    </div>
                                </td>
                                <td className="col-span-1 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
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

export default ReservationAdmin;
