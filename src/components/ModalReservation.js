export default function ModalReservation({ auth, showModal, setShowModal, reservation }) {
    const reservationFields = [
        {
            label: 'Id',
            name: '_id',
        },
        {
            label: 'Parking site',
            name: 'parkingSite.name' || 'parkingSite[0].name',
        },
        auth?.account?.type === 'admin' && {
            label: 'Account',
            name: 'account.username' || 'account[0].username',
        },
        {
            label: 'Address',
            name: 'parkingSite.location.address' || 'parkingSite[0].location.address',
        },
        {
            label: 'Price',
            name: 'parkingSite.price' || 'parkingSite[0].price',
        },
        {
            label: 'Reserving time',
            name: 'reservingTime',
        },
        {
            label: 'Entering time',
            name: 'enteringTime',
        },
        {
            label: 'Number plate',
            name: 'lpNumber',
        },
    ].filter((item) => item);

    const handleClickOut = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
        }
    };

    const handleClickClose = () => {
        setShowModal(false);
    };
    const renderFieldValue = (name) => {
        const value = name.split('.').reduce((obj, key) => obj?.[key], reservation);

        if (name === 'enteringTime' || name === 'reservingTime') {
            const timestamp = value;
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString();
            console.log(typeof formattedDate);
            if (formattedDate === 'Invalid Date') {
                return '---';
            } else {
                return formattedDate;
            }
        }

        return value ?? '---';
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        onClick={handleClickOut}
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-visible bg-black/25 outline-none focus:outline-none"
                    >
                        <div className={`mx-auto flex w-5/6 items-center md:w-2/5`}>
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 px-6 py-5">
                                    <h4 className="text-xl font-semibold">Reservation Details</h4>
                                    <button
                                        className="float-right ml-auto border-0 bg-transparent text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                                        onClick={handleClickClose}
                                    >
                                        <span className="block text-3xl text-black opacity-100 outline-none transition duration-300 hover:text-red-500 focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="px-6 py-2">
                                    {reservationFields.map(({ label, name }) => (
                                        <div key={name} className="mb-4">
                                            <label className="mb-2 block text-sm font-bold text-gray-700">
                                                {label}:{' '}
                                            </label>
                                            <span className="text-gray-500">{renderFieldValue(name)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-3 mr-3 flex items-center justify-end rounded-b">
                                    <button
                                        className="background-transparent rounded px-6 py-3 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-200 ease-linear hover:ring-4 hover:ring-gray-200 focus:outline-none"
                                        type="button"
                                        onClick={handleClickClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
