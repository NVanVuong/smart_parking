import { useState, useEffect, useRef } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import Slider from '@mui/material/Slider';

const minPrice = 1000;
const minAvailable = 1;

export default function FilterParkingSite({ setPrice, setAvailable, price, available, handleSearch }) {
    const [showFilter, setShowFilter] = useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [filterRef]);

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleChangePrice = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minPrice) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 50000 - minPrice);
                setPrice([clamped, clamped + minPrice]);
            } else {
                const clamped = Math.max(newValue[1], minPrice);
                setPrice([clamped - minPrice, clamped]);
            }
        } else {
            setPrice(newValue);
        }
    };

    const handleChangeAvailable = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minAvailable) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 500 - minAvailable);
                setAvailable([clamped, clamped + minAvailable]);
            } else {
                const clamped = Math.max(newValue[1], minAvailable);
                setAvailable([clamped - minAvailable, clamped]);
            }
        } else {
            setAvailable(newValue);
        }
    };

    const handleClickSearch = () => {
        handleSearch();
        setShowFilter(false);
    };
    return (
        <div ref={filterRef} className="relative h-8 text-left">
            <button
                onClick={handleShowFilter}
                className="flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                Filter
                <CaretDown size={18} className="-mr-1 text-gray-400" aria-hidden="true" />
            </button>
            {showFilter && (
                <div className="absolute right-0 z-10 mt-2 w-[500px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="my-2 flex h-16 w-full items-center justify-between px-4">
                        <span className="w-24 text-sm">Price: </span>
                        <div className="flex w-full flex-col">
                            <div className="flex justify-between">
                                <span className="text-sm">{price[0]}đ</span>
                                <span className="text-sm">{price[1]}đ</span>
                            </div>
                            <Slider
                                max={50000}
                                step={1000}
                                value={price}
                                onChange={handleChangePrice}
                                valueLabelDisplay="auto"
                                disableSwap
                            />
                        </div>
                    </div>
                    <div className="my-2 flex h-16 items-center justify-center px-4">
                        <span className="w-24 text-sm">Available: </span>
                        <div className="flex h-16 w-full items-center justify-between">
                            <div className="flex w-full flex-col">
                                <div className="flex justify-between">
                                    <span className="text-sm">{available[0]} </span>
                                    <span className="text-sm">{available[1]} </span>
                                </div>
                                <Slider
                                    max={500}
                                    step={10}
                                    value={available}
                                    onChange={handleChangeAvailable}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 flex w-full justify-end">
                        <button
                            onClick={() => handleClickSearch()}
                            className="mr-3 rounded-md bg-blue-main px-4 py-2 text-sm text-white hover:bg-blue-main-hover"
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
