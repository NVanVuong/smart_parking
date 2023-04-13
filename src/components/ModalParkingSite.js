import { useState, useEffect } from 'react';

export default function ModalParkingSite({
    showModal,
    setShowModal,
    modeModal,
    currentParkingSite,
    handleSave,
    handleDelete,
    checkName,
}) {
    const [nameError, setNameError] = useState('');
    const parkingSiteFields = [
        {
            label: 'Id',
            name: '_id',
            type: 'text',
            hidden: modeModal === 'Add' || modeModal === 'Edit',
        },
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            error: nameError,
        },
        {
            label: 'Address',
            name: 'address',
            type: 'text',
        },
        {
            label: 'Coordinates',
            name: 'coordinates',
            type: 'string',
        },
        {
            label: 'Max Spot',
            name: 'maxSpot',
            type: 'number',
        },
        {
            label: 'Available Spot',
            name: 'availableSpot',
            type: 'number',
            hidden: modeModal === 'Add' || modeModal === 'Edit',
        },
        {
            label: 'Price',
            name: 'price',
            type: 'number',
        },
        {
            label: 'Description',
            name: 'description',
            type: 'text',
        },
    ];

    const [parkingSite, setParkingSite] = useState({
        name: '',
        address: '',
        coordinates: [],
        maxSpot: '',
        availSpot: '',
        price: '',
        description: '',
    });

    useEffect(() => {
        if (modeModal === 'Add') {
            setParkingSite({});
        } else {
            const { location, ...rest } = currentParkingSite || {};
            setParkingSite({
                ...rest,
                address: location?.address,
                coordinates: location?.coordinates,
            });
        }
    }, [currentParkingSite, modeModal]);

    // const handleClickOut = (event) => {
    //     if (event.target === event.currentTarget) {
    //         setShowModal(false);
    //         setNameError('');
    //         if (modeModal === 'Add') {
    //             setParkingSite({});
    //         } else {
    //             const { location, ...rest } = currentParkingSite || {};
    //             setParkingSite({
    //                 ...rest,
    //                 address: location?.address,
    //                 coordinates: location?.coordinates,
    //             });
    //         }
    //     }
    // };

    const handleClickClose = () => {
        setShowModal(false);
        setNameError('');
        if (modeModal === 'Add') {
            setParkingSite({});
        } else {
            const { location, ...rest } = currentParkingSite || {};
            setParkingSite({
                ...rest,
                address: location?.address,
                coordinates: location?.coordinates,
            });
        }
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            if (checkName(value)) {
                event.target.focus();
                setNameError('This name already exists. Try another');
                setParkingSite((prevParkingSite) => ({ ...prevParkingSite, [name]: '' }));
            } else {
                setParkingSite((prevParkingSite) => ({ ...prevParkingSite, [name]: value }));
                setNameError('');
            }
        } else {
            setParkingSite((prevParkingSite) => ({ ...prevParkingSite, [name]: value }));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParkingSite((prevParkingSite) => ({
            ...prevParkingSite,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(parkingSite);
        await handleSave(parkingSite);
        setShowModal(false);
        setParkingSite(currentParkingSite ?? {});
    };

    return (
        <>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/25 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto w-2/5">
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
                                        parkingSiteFields.map((field, index) =>
                                            !field.hidden ? (
                                                <div key={index} className="mb-4">
                                                    <label
                                                        htmlFor={field.name}
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        {field.label}
                                                    </label>
                                                    <>
                                                        <input
                                                            name={field.name}
                                                            id={field.name}
                                                            type={field.type}
                                                            value={parkingSite[field.name] ?? ''}
                                                            step={field.name === 'price' ? 1000 : undefined}
                                                            min={field.name === 'price' ? 1000 : undefined}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            className={`${
                                                                field.name === 'name' && field.error !== ''
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
                                                </div>
                                            ) : null,
                                        )
                                    ) : (
                                        <div>
                                            Bạn có chắn chắn muốn xóa nhà xe{' '}
                                            <span className="font-semibold">{parkingSite.name}</span> ?
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
                                                    onClick={() => handleDelete(parkingSite._id)}
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
