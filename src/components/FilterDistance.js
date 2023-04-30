import { useEffect, useRef } from 'react';
import { AiOutlineTrademarkCircle } from 'react-icons/ai';
import Slider from '@mui/material/Slider';

export default function FilterDistance({
    showRadius,
    setShowRadius,
    showFilter,
    setShowFilter,
    distance,
    setDistance,
    center,
    setCurrentFilter,
    getParkingNearBy,
}) {
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
    }, [filterRef, setShowFilter]);

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleDistanceChange = (e) => {
        setDistance(e.target.value);
    };

    const handleClick = () => {
        setShowRadius(!showRadius);
    };

    const handleClickOK = () => {
        setShowFilter(!showFilter);
        setCurrentFilter('closest');
        getParkingNearBy([center.lat, center.lng], distance);
    };

    return (
        <div ref={filterRef} className="absolute top-[112px] z-[9999] ml-[10.5px] block cursor-pointer rounded">
            <button className="flex">
                <AiOutlineTrademarkCircle
                    onClick={handleClick}
                    onDoubleClick={handleShowFilter}
                    className={`${
                        showRadius ? 'text-blue-main' : 'text-gray-400'
                    } rounded border-2 border-[#0003] bg-white p-1 text-[33px] `}
                />
            </button>

            {showFilter && (
                <div className="absolute left-0 z-[100] mt-2 w-[350px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="mt-3 mb-2 flex h-16 w-full items-center justify-between px-4">
                        <span className="mr-3 w-24 text-sm">Distance: </span>
                        <div className="relative flex w-full flex-col">
                            <span className="absolute bottom-6 right-0 text-sm">{distance}km</span>
                            <Slider
                                onChange={handleDistanceChange}
                                value={distance}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={10}
                            />
                        </div>
                        <button
                            onClick={handleClickOK}
                            className="ml-3 flex h-fit items-center justify-center gap-x-1.5 rounded-md bg-blue-main px-3 py-2 text-xs font-semibold text-white shadow-sm transition duration-300  hover:ring-4 hover:ring-blue-main-ring"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
