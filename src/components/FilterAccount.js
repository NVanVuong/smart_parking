import { useEffect, useRef, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';

function FilterAccount({ selectedFilter, handleFilterChange }) {
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

    const handleSelectFilter = (value) => {
        handleFilterChange(value);
        console.log(value);
        setShowFilter(false);
    };

    const types = [
        { label: 'All', value: '' },
        { label: 'Admin', value: 'ad' },
        { label: 'User', value: 'user' },
    ];

    return (
        <div ref={filterRef} className="relative h-8 text-left">
            <button
                onClick={handleShowFilter}
                className="flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                {types.find((type) => type.value === selectedFilter)?.label || 'All'}
                <CaretDown size={18} className="-mr-1 text-gray-400" aria-hidden="true" />
            </button>
            {showFilter && (
                <div className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ul className="py-1">
                        {types.map((type, index) => (
                            <li
                                onClick={() => handleSelectFilter(type.value)}
                                key={index}
                                className="cursor-pointer bg-white px-4 py-2 text-sm text-gray-900 duration-300 hover:bg-gray-100"
                            >
                                {type.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FilterAccount;
