import { useState, useEffect, Fragment } from 'react';
import { Plus, Trash, Pencil, CheckCircle, XCircle, Info } from '@phosphor-icons/react';
import adminApi, { category } from '~/api/adminApi';
import Loading from './Loading';
import SearchAdmin from './SearchAdmin';
import ModalAccount from './ModalAccount';

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modeModal, setModeModal] = useState('');
    const [currentAccount, setCurrentAccount] = useState();
    const [usernameExist, setUsernameExist] = useState([]);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = async () => {
        const response = await adminApi.getAll(category.accounts);
        const accounts = response.data.data.accounts;
        const usernames = accounts.map((account) => account.username);
        setUsernameExist(usernames);
        setAccounts(accounts);
        setLoading(false);
    };

    const handleModal = (modeModal, currentAccount) => {
        setCurrentAccount(currentAccount);
        setShowModal(!showModal);
        setModeModal(modeModal);
    };

    const handleSearch = async (searchKeyword) => {
        const response = await adminApi.searchAccount(searchKeyword, type);
        setAccounts(response.data.data.accounts);
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
        <div className="relative mx-auto min-w-fit flex-grow">
            <ModalAccount
                showModal={showModal}
                modeModal={modeModal}
                setShowModal={setShowModal}
                usernameExist={usernameExist}
                currentAccount={currentAccount}
                handleSave={handleSave}
                handleDelete={handleDelete}
            ></ModalAccount>
            <div className="mb-5 flex h-16 items-center justify-between border-b-2 border-gray-200 focus-within:border-blue-main focus-within:shadow-md ">
                <SearchAdmin
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    type={type}
                    setType={setType}
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
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="w-96 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
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
                                className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Active
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
                        {accounts.map((account) => (
                            <tr key={account._id} className="group hover:bg-gray-50">
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-main">
                                        {account.name}
                                    </div>
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
                                <td className=" whitespace-nowrap px-6 py-4">
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
                                <td className="invisible flex items-center justify-end whitespace-nowrap px-6 py-4 text-sm font-medium group-hover:visible">
                                    <button
                                        onClick={() => handleModal('View', account)}
                                        className="text-gray-400 transition duration-300 hover:scale-110 hover:text-sky-400 hover:drop-shadow-md"
                                    >
                                        <Info size={22} weight="bold" />
                                    </button>
                                    <button
                                        onClick={() => handleModal('Edit', account)}
                                        className="ml-2 text-gray-400 transition duration-300 hover:scale-110 hover:text-yellow-400  hover:drop-shadow-md"
                                    >
                                        <Pencil size={22} weight="bold" />
                                    </button>
                                    <button
                                        onClick={() => handleModal('Delete', account)}
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
        </div>
    ) : (
        <Loading />
    );
}

export default Accounts;
