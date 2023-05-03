import { useState, useEffect } from 'react';

export default function ModalInformation({ showModal, setShowModal, currentAccount, handleSave, exist }) {
    const [error, setError] = useState('');
    // const [errorInput, setErrorInput] = useState('');
    const accountFields = [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
        },
        {
            label: 'Phone',
            name: 'phone',
            type: 'text',
            error: error,
        },
    ];

    const [account, setAccount] = useState({
        name: '',
        phone: '',
    });

    useEffect(() => {
        setAccount(currentAccount ?? {});
    }, [currentAccount]);

    const handleClickOut = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
            setError('');
            setAccount(currentAccount ?? {});
        }
    };

    const handleClickClose = () => {
        setShowModal(false);
        setError('');
        setAccount(currentAccount ?? {});
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
        setAccount(currentAccount ?? {});
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        onClick={handleClickOut}
                        className="fixed inset-0 z-50 flex items-center overflow-y-auto overflow-x-hidden bg-black/25 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto w-4/5 md:w-1/4">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 px-6 py-5">
                                    <h4 className="text-xl font-semibold">Update</h4>
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
                                    {accountFields.map((field, index) => (
                                        <div key={index} className="mb-4">
                                            <label
                                                htmlFor={field.name}
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                {field.label}
                                            </label>
                                            <input
                                                name={field.name}
                                                id={field.name}
                                                type={field.type}
                                                value={account[field.name] ? account[field.name] : ''}
                                                onChange={handleChange}
                                                className={`${
                                                    (field.name === 'username' || field.name === 'phone') && field.error
                                                        ? 'focus:ring-red-500'
                                                        : 'focus:ring-blue-main-ring'
                                                } mt-1 block h-8 w-full rounded-md border border-gray-200 shadow-sm  focus:outline-none focus:ring-4 focus:ring-opacity-70 disabled:bg-gray-50`}
                                                autoComplete="off"
                                                required
                                            />
                                            {/* {field.error && field.name === errorInput && (
                                                <div className="mt-1 text-sm text-red-500">{field.error}</div>
                                            )} */}
                                        </div>
                                    ))}
                                    <div className="mt-6 flex items-center justify-end rounded-b">
                                        <button
                                            className="background-transparent rounded px-6 py-3 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-200 ease-linear hover:ring-4 hover:ring-gray-200 focus:outline-none"
                                            type="button"
                                            onClick={handleClickClose}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className={`ml-2 rounded bg-blue-main px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-200 ease-linear hover:ring-4 hover:ring-blue-main-ring focus:outline-none  active:bg-blue-main-ring`}
                                            type="submit"
                                        >
                                            Save
                                        </button>
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
