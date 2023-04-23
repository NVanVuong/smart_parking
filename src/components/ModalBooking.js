import { useState } from 'react';
import { toast } from 'react-toastify';

import userApi from '~/api/userApi';

export default function ModalBooking({ parkingSite, showModal, setShowModal }) {
    const [numberPlate, setNumberPlate] = useState('');

    const handleClickOut = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
        }
    };

    const handleClickClose = () => {
        setShowModal(false);
    };

    const handleChange = (event) => {
        setNumberPlate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newReservation = {
            parkingSite: parkingSite._id,
            lpNumber: numberPlate,
        };
        try {
            const response = await userApi.bookReservation(newReservation);
            if (response.data.status === 'success') {
                toast.success(`Booking successfully at ${parkingSite.name}!`);
                setShowModal(false);
            } else {
                toast.error(`Booking failed: ${response.data.message}`);
            }
        } catch (error) {
            toast.error(`Error booking: ${error.message}`);
        }
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        onClick={handleClickOut}
                        className="fixed inset-0 z-[99999] flex items-center overflow-y-auto overflow-x-hidden bg-black/25 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto w-4/5 md:w-1/4">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 px-6 py-3">
                                    <h4 className="text-xl font-semibold">Booking</h4>
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
                                    <label
                                        htmlFor="Number plate"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Number plate
                                    </label>
                                    <input
                                        name="Number plate"
                                        id="number-plate"
                                        type="text"
                                        onChange={handleChange}
                                        className={`mt-1 block h-10 w-full rounded-md border border-gray-200 text-sm shadow-sm focus:outline-none  focus:ring-4 focus:ring-blue-main-ring focus:ring-opacity-70 disabled:bg-gray-50`}
                                        autoComplete="off"
                                        placeholder="Enter your number plate"
                                        required
                                    />
                                    <div className="mt-6 flex items-center justify-end rounded-b">
                                        <button
                                            className="background-transparent rounded-sm px-6 py-3 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-200 ease-linear hover:ring-4 hover:ring-gray-200 focus:outline-none"
                                            type="button"
                                            onClick={handleClickClose}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className={`ml-2 rounded-sm bg-blue-main px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-200 ease-linear hover:ring-4 hover:ring-blue-main-ring focus:outline-none active:bg-blue-main-ring`}
                                            type="submit"
                                        >
                                            Book
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
