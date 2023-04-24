import { useState, useEffect } from 'react';
// import { Plus, Trash, Pencil, Info } from '@phosphor-icons/react';
import adminApi, { category } from '~/api/adminApi';
import SearchAdmin from './SearchAdmin';
import Loading from './Loading';
// import ModalParkingSite from './ModalParkingSite';
import Pagination from './Pagination';

function Tickets() {
    const [reservations, setReservations] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [reservationPerPage] = useState(8);
    const indexOfLastParkingSite = currentPage * reservationPerPage;
    const indexOfFirstParkingSite = indexOfLastParkingSite - reservationPerPage;
    const totalReservation = reservations.length;
    const totalPages = Math.ceil(totalReservation / reservationPerPage);
    const currentReservations = reservations.slice(indexOfFirstParkingSite, indexOfLastParkingSite);

    useEffect(() => {
        getParkingSites();
    }, []);

    const getParkingSites = async () => {
        const response = await adminApi.getAll(category.reservation);
        const reservation = response.data.data.data;
        console.log(reservation);

        setReservations(reservation);
        setLoading(false);
    };

    const handleSearch = async (searchKeyword) => {
        const response = await adminApi.searchParkingSite(searchKeyword);
        setReservations(response.data.data.parkingsite);
    };

    return !loading ? (
        <div className="relative flex grow flex-col">
            <div className="mb-3 flex h-14 items-center justify-between border-b-2 border-gray-200 focus-within:border-b-2 focus-within:border-blue-main focus-within:shadow-md md:mb-5 md:h-16">
                <SearchAdmin
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    handleSearch={handleSearch}
                />
                <span className="mx-2 h-9 border md:mx-4"></span>
                <p className="mr-4 text-xs font-semibold md:mr-8 md:text-sm">nvvuong</p>
            </div>

            <div className="mx-4 border border-gray-200 shadow sm:rounded-lg md:mx-8">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="grid grid-cols-5 md:grid-cols-11">
                            <th
                                scope="col"
                                className="col-span-3 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Id
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Id Account
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Id ParkingSite
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Reverving Time
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                LP Number
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {currentReservations.map((reservation) => (
                            <tr
                                key={reservation._id}
                                className="group grid grid-cols-5 hover:bg-gray-50 md:grid-cols-11"
                            >
                                <td className="col-span-3 whitespace-nowrap  py-4 px-3 md:col-span-3 md:px-6 ">
                                    <div className="overflow-hidden text-sm font-medium text-gray-900 group-hover:text-blue-main">
                                        {reservation._id}
                                    </div>
                                </td>
                                <td className="col-span-2 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-sm text-gray-500">{reservation.account}</div>
                                </td>
                                <td className="col-span-2 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-sm text-gray-500">{reservation.parkingSite}</div>
                                </td>
                                <td className="col-span-2 hidden whitespace-nowrap px-3 py-4 md:block md:px-6">
                                    <div className="text-sm text-gray-500">{reservation.reservingTime} đ</div>
                                </td>
                                <td className="col-span-2 hidden overflow-hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 md:block md:px-6">
                                    {reservation.lpNumber}
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

export default Tickets;
