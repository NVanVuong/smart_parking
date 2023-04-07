import { useState, useEffect } from 'react';
import { Plus, Trash, Pencil, Eye } from '@phosphor-icons/react';
import adminApi, { category } from '~/api/adminApi';
import SearchAdmin from './SearchAdmin';
import Loading from './Loading';
import FilterParkingSite from './FilterParkingSite';

function ParkingSites() {
    const [parkingSites, setParkingSites] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState([0, 50000]);
    const [available, setAvailable] = useState([0, 500]);

    useEffect(() => {
        getParkingSites();
    }, []);

    const getParkingSites = async () => {
        const response = await adminApi.getAll(category.parkingsites);
        setParkingSites(response.data.data.parkingSite);
        setLoading(false);
    };
    console.log(price, available);

    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
        if (e.target.value === '') getParkingSites();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        const response = await adminApi.searchParkingSite(
            available[0],
            available[1],
            price[0],
            price[1],
            searchKeyword,
        );
        setParkingSites(response.data.data.parkingsite);
    };

    const handleDelete = (id) => {
        adminApi
            .delete(category.parkingsites, id)
            .then(() => {
                const updatedParkingSites = parkingSites.filter((site) => site._id !== id);
                setParkingSites(updatedParkingSites);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return !loading ? (
        <div className="mx-auto min-w-fit flex-grow">
            <div className="mb-5 flex h-16 items-center justify-between border-b-2 border-gray-200 focus-within:border-b-[3px] focus-within:border-blue-main focus-within:shadow-md">
                <SearchAdmin handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} />
                <FilterParkingSite
                    setPrice={setPrice}
                    setAvailable={setAvailable}
                    price={price}
                    available={available}
                    handleSearch={handleSearch}
                />
                <span className="mx-4 h-9 border"></span>
                <p className="mr-8 h-6 text-sm font-semibold">nvvuong</p>
            </div>
            <button className="ml-8 mb-3 flex items-center rounded-md bg-blue-main p-2 text-white transition duration-300 hover:bg-blue-main-hover hover:drop-shadow-lg">
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
                                Max Spots
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Available Spots
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {parkingSites.map((parkingSite) => (
                            <tr key={parkingSite._id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{parkingSite.name}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{parkingSite.maxSpot}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{parkingSite.availableSpot}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{parkingSite.price}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {parkingSite.description}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <button className="text-sky-400 transition duration-300 hover:scale-110 hover:drop-shadow-md">
                                        <Eye size={22} weight="bold" />
                                    </button>
                                    <button className="ml-2 text-yellow-400 transition duration-300 hover:scale-110  hover:drop-shadow-md">
                                        <Pencil size={22} weight="bold" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(parkingSite._id)}
                                        className="ml-2 text-red-500 transition duration-300 hover:scale-110 hover:drop-shadow-md"
                                    >
                                        <Trash size={22} weight="bold" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default ParkingSites;
