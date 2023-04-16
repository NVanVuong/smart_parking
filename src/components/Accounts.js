import { useState, useEffect, Fragment } from 'react';
import { Plus, Trash, Pencil, CheckCircle, XCircle, Info } from '@phosphor-icons/react';
import adminApi, { category } from '~/api/adminApi';
import Loading from './Loading';
import SearchAdmin from './SearchAdmin';
import ModalAccount from './ModalAccount';
import Pagination from './Pagination';

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modeModal, setModeModal] = useState('');
    const [currentAccount, setCurrentAccount] = useState();
    const [exist, setExist] = useState({ username: [], phone: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [accountsPerPage] = useState(8);
    const indexOfLastAccount = currentPage * accountsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
    const totalAccounts = accounts.length;
    const totalPages = Math.ceil(totalAccounts / accountsPerPage);
    const currentAccounts = accounts.slice(indexOfFirstAccount, indexOfLastAccount);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = async () => {
        const response = await adminApi.getAll(category.accounts);
        const accounts = response.data.data.accounts;
        const usernames = accounts.map((account) => account.username);
        const phones = accounts.map((account) => account.phone);
        setExist((prevState) => ({
            ...prevState,
            username: usernames,
            phone: phones,
        }));
        setAccounts(accounts);
        setLoading(false);
    };

    const handleSearch = async (searchKeyword) => {
        const response = await adminApi.searchAccount(searchKeyword, type);
        setAccounts(response.data.data.accounts);
    };

    const handleModal = (modeModal, currentAccount) => {
        setCurrentAccount(currentAccount);
        setShowModal(!showModal);
        setModeModal(modeModal);
    };

    const handleSave = async (account) => {
        const updatedAccount = { ...account };
        delete updatedAccount.username;

        if (modeModal === 'Add') {
            await adminApi.create(category.accounts, account);
        } else if (modeModal === 'Edit') {
            await adminApi.update(category.accounts, account._id, updatedAccount);
        }

        modeModal === 'Add' ? await getAccounts() : await handleSearch(searchKeyword);
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        await adminApi.delete(category.accounts, id);
        await handleSearch(searchKeyword);
        setShowModal(false);
    };

    return !loading ? (
        <div className="flex grow flex-col">
            <ModalAccount
                showModal={showModal}
                modeModal={modeModal}
                setShowModal={setShowModal}
                exist={exist}
                currentAccount={currentAccount}
                handleSave={handleSave}
                handleDelete={handleDelete}
            ></ModalAccount>
            <div className="mb-3 flex h-14 items-center justify-between border-b-2 border-gray-200 focus-within:border-b-2 focus-within:border-blue-main focus-within:shadow-md md:mb-5 md:h-16">
                <SearchAdmin
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    type={type}
                    setType={setType}
                    handleSearch={handleSearch}
                />
                <span className="mx-2 h-9 border md:mx-4"></span>
                <p className="mr-4 text-xs font-semibold md:mr-8 md:text-sm">nvvuong</p>
            </div>
            <button
                onClick={() => handleModal('Add', null)}
                className="ml-4 mb-3 flex w-fit items-center rounded-md bg-blue-main p-2 text-white transition duration-300 hover:bg-blue-main-hover hover:ring-4 hover:ring-blue-main-ring md:ml-8 md:mb-6"
            >
                <Plus size={20} weight="bold" className=" mr-1 drop-shadow-md transition-all duration-500 " />
                <span className="mr-1 text-sm">Add new</span>
            </button>
            <div className="mx-4 border border-gray-200 shadow sm:rounded-lg md:mx-8">
                <table className="w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50">
                        <tr className="grid grid-cols-4 md:grid-cols-9">
                            <th
                                scope="col"
                                className="col-span-3 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="col-span-2 hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                User name
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Type
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Phone
                            </th>
                            <th
                                scope="col"
                                className="col-span-1 hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
                            >
                                Active
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
                        {currentAccounts.map((account) => (
                            <tr key={account._id} className="group grid grid-cols-4 hover:bg-gray-50 md:grid-cols-9">
                                <td className="col-span-3 whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-main">
                                        {account.name}
                                    </div>
                                </td>
                                <td className="col-span-2 hidden whitespace-nowrap px-6 py-4 md:block">
                                    <div className="text-sm text-gray-500">{account.username}</div>
                                </td>
                                <td className="col-span-1 hidden whitespace-nowrap px-6 py-4 md:block">
                                    <div className="text-sm text-gray-500">{account.type}</div>
                                </td>
                                <td className="col-span-1 hidden whitespace-nowrap px-6 py-4 md:block">
                                    <div className="text-sm text-gray-500">{account.phone}</div>
                                </td>
                                <td className="col-span-1 hidden justify-end whitespace-nowrap px-6 py-4 md:flex">
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
                                <td className="col-span-1 mr-3 flex items-center justify-center whitespace-nowrap text-sm font-medium  md:invisible md:mr-0 md:group-hover:visible">
                                    <button
                                        onClick={() => handleModal('View', account)}
                                        className="text-lg text-gray-400 transition duration-300 hover:scale-110 hover:text-sky-400 hover:drop-shadow-md md:text-xl"
                                    >
                                        <Info weight="bold" />
                                    </button>
                                    <button
                                        onClick={() => handleModal('Edit', account)}
                                        className="ml-2 text-lg text-gray-400 transition duration-300 hover:scale-110 hover:text-yellow-400 hover:drop-shadow-md  md:text-xl"
                                    >
                                        <Pencil weight="bold" />
                                    </button>
                                    <button
                                        onClick={() => handleModal('Delete', account)}
                                        className="ml-2 text-lg text-gray-400 transition duration-300 hover:scale-110 hover:text-red-500 hover:drop-shadow-md md:text-xl"
                                    >
                                        <Trash weight="bold" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <Pagination
                    items={accounts}
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

export default Accounts;
