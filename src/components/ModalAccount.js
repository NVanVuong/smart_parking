import { useState, useEffect } from 'react';

export default function ModalAccount({
    showModal,
    setShowModal,
    modeModal,
    currentAccount,
    handleSave,
    handleDelete,
    usernameExist,
}) {
    const [usernameError, setUsernameError] = useState('');
    const accountFields = [
        {
            label: 'Id',
            name: '_id',
            type: 'text',
            hidden: modeModal === 'Edit' || modeModal === 'Add',
        },
        {
            label: 'Name',
            name: 'name',
            type: 'text',
        },
        {
            label: 'Username',
            name: 'username',
            type: 'text',
            error: usernameError,
            hidden: modeModal === 'Edit',
        },

        {
            label: 'Password',
            name: 'password',
            type: 'text',
            hidden: modeModal === 'Edit' || modeModal === 'View',
        },
        {
            label: 'Phone',
            name: 'phone',
            type: 'text',
        },
        {
            label: 'Type',
            name: 'type',
            type: 'select',
            options: [
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
            ],
        },
    ];

    const checkUsername = (username) => {
        return usernameExist.includes(username);
    };

    const [account, setAccount] = useState({
        name: '',
        username: '',
        password: '',
        phone: '',
        type: 'admin',
    });

    useEffect(() => {
        if (modeModal === 'Add') {
            setAccount({
                name: '',
                username: '',
                password: '',
                phone: '',
                type: 'admin',
            });
        } else {
            setAccount(currentAccount ?? {});
        }
    }, [currentAccount, modeModal]);

    const handleClickOut = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
            setUsernameError('');
            setAccount(modeModal === 'Add' ? {} : currentAccount ?? {});
        }
    };

    const handleClickClose = () => {
        setShowModal(false);
        setUsernameError('');
        setAccount(modeModal === 'Add' ? {} : currentAccount ?? {});
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            if (checkUsername(value)) {
                event.target.focus();
                setUsernameError('This username already exists. Try another');
                setAccount((prevAccount) => ({ ...prevAccount, [name]: '' }));
            } else {
                setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
                setUsernameError('');
            }
        } else {
            setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleSave(account);
        setShowModal(false);
        setAccount(modeModal === 'Add' ? {} : currentAccount ?? {});
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        onClick={handleClickOut}
                        className="fixed inset-0 z-50 flex items-center overflow-y-auto overflow-x-hidden bg-black/25 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto w-1/3">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 px-6 py-5">
                                    <h4 className="text-xl font-semibold">
                                        {modeModal === 'View'
                                            ? 'Information'
                                            : modeModal === 'Edit'
                                            ? 'Update'
                                            : modeModal}{' '}
                                    </h4>
                                    <button
                                        className="float-right ml-auto border-0 bg-transparent text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                                        onClick={handleClickClose}
                                    >
                                        <span className="block text-3xl text-black opacity-100 outline-none transition duration-300 hover:text-red-500 focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="relative w-auto p-6">
                                    {modeModal !== 'Delete' ? (
                                        accountFields.map((field, index) =>
                                            !field.hidden ? (
                                                <div key={index} className="mb-4">
                                                    <label
                                                        htmlFor={field.name}
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        {field.label}
                                                    </label>
                                                    {field.type === 'select' ? (
                                                        <select
                                                            name={field.name}
                                                            id={field.name}
                                                            value={account[field.name]}
                                                            onChange={handleChange}
                                                            className={`${
                                                                modeModal === 'View' && 'appearance-none'
                                                            } mt-1 block h-8 w-full rounded-md border border-gray-200  shadow-sm focus:outline-none focus:ring focus:ring-blue-main focus:ring-opacity-70 disabled:bg-gray-50`}
                                                            disabled={modeModal === 'View'}
                                                        >
                                                            {field.options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <>
                                                            <input
                                                                name={field.name}
                                                                id={field.name}
                                                                type={field.type}
                                                                value={account[field.name] ? account[field.name] : ''}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                className={`${
                                                                    field.name === 'username' && field.error !== ''
                                                                        ? 'focus:ring-red-500'
                                                                        : 'focus:ring-blue-main'
                                                                } mt-1 block h-8 w-full rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring  focus:ring-opacity-70 disabled:bg-gray-50`}
                                                                disabled={modeModal === 'View'}
                                                                autoComplete="off"
                                                                required
                                                            />
                                                            {field.error && (
                                                                <div className="mt-1 text-sm text-red-500">
                                                                    {field.error}
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ) : null,
                                        )
                                    ) : (
                                        <div>
                                            Bạn có chắn chắn muốn xóa account{' '}
                                            <span className="font-semibold">{account.username}</span> ?
                                        </div>
                                    )}
                                    <div className="mt-6 flex items-center justify-end rounded-b">
                                        <button
                                            className="background-transparent rounded px-6 py-3 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear hover:bg-gray-50 hover:shadow-lg focus:outline-none"
                                            type="button"
                                            onClick={handleClickClose}
                                        >
                                            Close
                                        </button>
                                        {modeModal !== 'View' &&
                                            (modeModal === 'Delete' ? (
                                                <button
                                                    className={`${'bg-red-500'} ml-2 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600`}
                                                    type="button"
                                                    onClick={() => handleDelete(account._id)}
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <button
                                                    className={`${
                                                        modeModal === 'Add' ? 'bg-blue-main' : 'bg-yellow-400'
                                                    } ml-2  rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600`}
                                                    type="submit"
                                                >
                                                    Save
                                                </button>
                                            ))}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
