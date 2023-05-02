import { useEffect, useState } from 'react';
import { RiMedal2Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import adminApi, { category } from '~/api/adminApi';
import userApi from '~/api/userApi';
import ModalInfo from './ModalInfo';
import Loading from './Loading';

function Information({ auth }) {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (auth?.account?._id) {
            getAccount();
        }
        // eslint-disable-next-line
    }, []);

    const getAccount = async () => {
        const response = await userApi.getAccount(auth?.account?._id);
        const account = response.data.data.account;
        setAccount(account);
        setLoading(false);
    };

    const handleSave = async (account) => {
        const updatedAccount = { ...account };
        delete updatedAccount.username;
        await adminApi.update(category.accounts, updatedAccount._id, updatedAccount);
        await getAccount();
        setShowModal(false);
    };

    return !loading ? (
        <div className="mx-auto mt-16 flex flex-col items-center justify-center py-10 md:mt-0">
            <ModalInfo
                showModal={showModal}
                currentAccount={account}
                setShowModal={setShowModal}
                handleSave={handleSave}
            />
            <img
                className="mb-4 h-32 w-32 rounded-full"
                src={`https://ui-avatars.com/api/?name=${account.name}`}
                alt="Avatar"
            />
            <div className="relative">
                <h1 className="mb-2 text-3xl font-medium">{account.name}</h1>
                <AiOutlineEdit
                    onClick={() => setShowModal(!showModal)}
                    className="absolute bottom-3 -right-8 cursor-pointer text-2xl text-gray-500 duration-200 hover:scale-110 hover:text-blue-main"
                />
            </div>
            <p className="mb-4 text-gray-500">@{account.username}</p>
            <div className="mb-4 flex items-center rounded-lg bg-gray-100 px-4 py-2 shadow-md">
                <FiPhoneCall className="mr-2 text-gray-600" />
                <p className="text-gray-600">{account.phone}</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-md transition duration-500 ease-in-out hover:shadow-lg">
                {account.type === 'admin' ? (
                    <>
                        <MdOutlineAdminPanelSettings className="text-2xl text-gray-600" />
                        <p className="ml-2 font-semibold capitalize text-gray-600">{account.type}</p>
                    </>
                ) : (
                    <>
                        <RiMedal2Line className="text-2xl text-slate-500" />
                        <p className="ml-2 font-semibold capitalize text-slate-500">Silver customer</p>
                    </>
                )}
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default Information;
