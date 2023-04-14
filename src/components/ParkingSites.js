import { useState, useEffect } from 'react';
import { Plus, Trash, Pencil, Info } from '@phosphor-icons/react';
import adminApi, { category } from '~/api/adminApi';
import SearchAdmin from './SearchAdmin';
import Loading from './Loading';
import ModalParkingSite from './ModalParkingSite';
import Pagination from './Pagination';

function ParkingSites() {
    const [parkingSites, setParkingSites] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState([]);
    const [available, setAvailable] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modeModal, setModeModal] = useState('');
    const [currentParikingSite, setCurrentParkingSite] = useState();
    const [nameExist, setNameExist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [parkingSitePerPage] = useState(8);
    const indexOfLastParkingSite = currentPage * parkingSitePerPage;
    const indexOfFirstParkingSite = indexOfLastParkingSite - parkingSitePerPage;
    const totalParkingSites = parkingSites.length;
    const totalPages = Math.ceil(totalParkingSites / parkingSitePerPage);
    const currentParikingSites = parkingSites.slice(indexOfFirstParkingSite, indexOfLastParkingSite);

    useEffect(() => {
        getParkingSites();
    }, []);

    const getParkingSites = async () => {
        const response = await adminApi.getAll(category.parkingsites);
        const parkingSites = response.data.data.parkingSite;

        const names = parkingSites.map((parkingSites) => parkingSites.name);
        setNameExist(names);

        const prices = parkingSites.map((parkingSite) => parkingSite.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPrice([minPrice, maxPrice]);

        const availables = parkingSites.map((parkingSite) => parkingSite.availableSpot);
        const minAvailable = Math.min(...availables);
        const maxAvailable = Math.max(...availables);
        setAvailable([minAvailable, maxAvailable]);

        setParkingSites(parkingSites);
        setLoading(false);
    };

    const handleModal = (modeModal, currentParkingSite) => {
        setCurrentParkingSite(currentParkingSite);
        setShowModal(!showModal);
        setModeModal(modeModal);
    };

    const handleSearch = async (searchKeyword) => {
        const response = await adminApi.searchParkingSite(
            available[0],
            available[1],
            price[0],
            price[1],
            searchKeyword,
        );
        setParkingSites(response.data.data.parkingsite);
    };

    const handleSave = async (parkingSite) => {
        const { lat, lng, location, ...rest } = parkingSite;
        const parkingSiteAdd = {
            ...rest,
            lgn: parkingSite.coordinates[0],
            lat: parkingSite.coordinates[1],
        };
        delete parkingSiteAdd.coordinates;

        const parkingSiteUpdated = {
            ...rest,
            location: {
                coordinates: parkingSite.coordinates,
                address: parkingSite.address,
                type: 'Point',
            },
        };
        delete parkingSiteUpdated.coordinates;
        delete parkingSiteUpdated.address;

        if (modeModal === 'Add') {
            await adminApi.create(category.parkingsites, parkingSiteAdd);
        } else if (modeModal === 'Edit') {
            await adminApi.update(category.parkingsites, parkingSiteUpdated._id, parkingSiteUpdated);
        }

        modeModal === 'Add' ? await getParkingSites() : await handleSearch(searchKeyword);
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        await adminApi.delete(category.parkingsites, id);
        await handleSearch(searchKeyword);
        setShowModal(false);
    };

    return !loading ? (
        <div className="mx-auto min-w-fit flex-grow">
            <ModalParkingSite
                showModal={showModal}
                modeModal={modeModal}
                setShowModal={setShowModal}
                nameExist={nameExist}
                currentParkingSite={currentParikingSite}
                handleSave={handleSave}
                handleDelete={handleDelete}
            ></ModalParkingSite>
            <div className="mb-5 flex h-16 items-center justify-between border-b-2 border-gray-200 focus-within:border-b-2 focus-within:border-blue-main focus-within:shadow-md">
                <SearchAdmin
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    price={price}
                    setPrice={setPrice}
                    available={available}
                    setAvailable={setAvailable}
                    handleSearch={handleSearch}
                />
                <span className="mx-4 h-9 border"></span>
                <p className="mr-8 h-6 text-sm font-semibold">nvvuong</p>
            </div>
            <button
                onClick={() => handleModal('Add', null)}
                className="ml-8 mb-3 flex items-center rounded-md bg-blue-main p-2 text-white transition duration-300 hover:bg-blue-main-hover hover:ring-4 hover:ring-blue-main-ring"
            >
                <Plus size={20} weight="bold" className=" mr-1 drop-shadow-md transition-all duration-500 " />
                <span className="mr-1 text-sm">Add new</span>
            </button>
            <div className="mx-8 overflow-hidden border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Max
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Available
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Address
                            </th>
                            <th
                                scope="col"
                                className="w-32 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                {/* Action */}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {currentParikingSites.map((parkingSite) => (
                            <tr key={parkingSite._id} className="group hover:bg-gray-50">
                                <td className="whitespace-nowrap px-6 py-4 ">
                                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-main">
                                        {parkingSite.name}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{parkingSite.maxSpot}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{parkingSite.availableSpot}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{parkingSite.price} đ</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {parkingSite.location.address}
                                </td>
                                <td className="invisible flex items-center justify-end whitespace-nowrap px-6 py-4 text-sm font-medium group-hover:visible">
                                    <button
                                        onClick={() => handleModal('View', parkingSite)}
                                        className="text-gray-400 transition duration-300 hover:scale-110 hover:text-sky-400 hover:drop-shadow-md"
                                    >
                                        <Info size={22} weight="bold" />
                                    </button>
                                    <button
                                        onClick={() => handleModal('Edit', parkingSite)}
                                        className="ml-2 text-gray-400 transition duration-300 hover:scale-110 hover:text-yellow-400  hover:drop-shadow-md"
                                    >
                                        <Pencil size={22} weight="bold" />
                                    </button>
                                    <button
                                        onClick={() => handleModal('Delete', parkingSite)}
                                        className="ml-2 text-gray-400 transition duration-300 hover:scale-110 hover:text-red-500 hover:drop-shadow-md"
                                    >
                                        <Trash size={22} weight="bold" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <Pagination
                    items={parkingSites}
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

export default ParkingSites;
