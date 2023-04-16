import { useEffect, useRef } from 'react';
import { SlidersHorizontal } from '@phosphor-icons/react';
import Slider from '@mui/material/Slider';

export default function FilterParkingSite({ showFilter, setShowFilter, price, setPrice, available, setAvailable }) {
    const filterRef = useRef(null);
    const maxPrice = 20000;
    const maxAvailable = 1500;
    const minPrice = 1000;
    const minAvailable = 1;

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
    }, [filterRef, setShowFilter]);

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleSliderChange = (event, newValue, activeThumb, minVal, maxVal, setVal) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        const range = newValue[1] - newValue[0];
        if (range < minVal) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxVal - minVal);
                setVal([clamped, clamped + minVal]);
            } else {
                const clamped = Math.max(newValue[1], minVal);
                setVal([clamped - minVal, clamped]);
            }
        } else {
            setVal(newValue);
        }
    };

    const handleChangePrice = (event, newValue, activeThumb) => {
        handleSliderChange(event, newValue, activeThumb, minPrice, maxPrice, setPrice);
    };

    const handleChangeAvailable = (event, newValue, activeThumb) => {
        handleSliderChange(event, newValue, activeThumb, minAvailable, maxAvailable, setAvailable);
    };

    return (
        <div ref={filterRef} className="relative h-full text-left">
            <button
                onClick={handleShowFilter}
                className="flex h-full w-full items-center justify-center gap-x-1.5 rounded-md border-2 bg-white p-2 font-semibold text-blue-main duration-300 hover:ring-4  hover:ring-blue-main-ring"
            >
                <SlidersHorizontal size={24} weight="bold" />
            </button>
            {showFilter && (
                <div className="absolute -left-48 z-10 mt-2 w-[380px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-0 md:w-[500px]">
                    <div className="mt-3 flex h-16 w-full items-center justify-between px-4">
                        <span className="w-24 text-sm">Price: </span>
                        <div className="flex w-full flex-col">
                            <div className="flex justify-between">
                                <span className="text-sm">{price[0]}đ</span>
                                <span className="text-sm">{price[1]}đ</span>
                            </div>
                            <Slider
                                max={maxPrice}
                                step={1000}
                                value={price}
                                onChange={handleChangePrice}
                                valueLabelDisplay="auto"
                                disableSwap
                            />
                        </div>
                    </div>
                    <div className="mt-4 mb-2 flex h-16 items-center justify-center px-4">
                        <span className="w-24 text-sm">Available: </span>
                        <div className="flex h-16 w-full items-center justify-between">
                            <div className="flex w-full flex-col">
                                <div className="flex justify-between">
                                    <span className="text-sm">{available[0]} </span>
                                    <span className="text-sm">{available[1]} </span>
                                </div>
                                <Slider
                                    max={maxAvailable}
                                    step={10}
                                    value={available}
                                    onChange={handleChangeAvailable}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
