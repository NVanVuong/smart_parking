import { useState, useEffect, Fragment } from 'react';
import { Plus, Trash, Pencil, CheckCircle, XCircle, Eye } from '@phosphor-icons/react';
import adminApi, { category } from '~/api/adminApi';
import Loading from './Loading';
import SearchAdmin from './SearchAdmin';
import FilterAccount from './FilterAccount';

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAccounts();
    }, []);

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line
    }, [selectedFilter]);

    const getAccounts = async () => {
        const response = await adminApi.getAll(category.accounts);
        setAccounts(response.data.data.accounts);
        setLoading(false);
    };

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
    };

    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
        if (e.target.value === '') getAccounts();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        const response = await adminApi.searchAccount(searchKeyword, selectedFilter);
        setAccounts(response.data.data.accounts);
    };

    const handleDelete = (id) => {
        adminApi
            .delete(category.accounts, id)
            .then(() => {
                const updatedAccounts = accounts.filter((site) => site._id !== id);
                setAccounts(updatedAccounts);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return !loading ? (
        <div className="relative mx-auto min-w-fit flex-grow">
            <div className="mb-5 flex h-16 items-center justify-between border-b-2 border-gray-200 focus-within:border-b-[3px] focus-within:border-blue-main focus-within:shadow-md">
                <SearchAdmin handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} />
                <FilterAccount selectedFilter={selectedFilter} handleFilterChange={handleFilterChange} />
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
                                User name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Type
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Phone
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Active
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
                        {accounts.map((account) => (
                            <tr key={account._id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{account.name}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{account.username}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{account.type}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-gray-500">{account.phone}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div
                                        className={`${
                                            account.isActive ? 'bg-green-500' : 'bg-red-500'
                                        } flex max-w-fit items-center justify-center rounded-xl p-1 text-[10px] font-medium leading-none text-white`}
                                    >
                                        {account.isActive ? (
                                            <Fragment>
                                                <CheckCircle size={12} weight="fill" className="mb-[1px] mr-0.5" />
                                                <span className="mr-0.5">Active</span>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <XCircle size={12} weight="fill" className="mr-0.5" />
                                                <span className="mr-0.5">Inactive</span>
                                            </Fragment>
                                        )}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <button className="text-sky-400 transition duration-300 hover:scale-110 hover:drop-shadow-md">
                                        <Eye size={22} weight="bold" />
                                    </button>
                                    <button className="ml-2 text-yellow-400 transition duration-300 hover:scale-110  hover:drop-shadow-md">
                                        <Pencil size={22} weight="bold" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(account._id)}
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

export default Accounts;
