import { useEffect, useRef } from 'react';
import { CaretDown } from '@phosphor-icons/react';

function FilterAccount({ showFilter, setShowFilter, type, setType }) {
    const filterRef = useRef(null);
    const typeSelected = type;

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

    const handleTypeChange = (value) => {
        setType(value);
        setShowFilter(false);
    };

    const types = [
        { label: 'All', value: '' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
    ];

    return (
        <div ref={filterRef} className="relative h-full text-left">
            <button
                onClick={handleShowFilter}
                className=" flex h-full w-full items-center justify-center gap-x-1.5 rounded-md border-2 bg-white px-2 py-2 text-xs font-semibold text-blue-main shadow-sm transition duration-300 hover:ring-4 hover:ring-blue-main-ring md:px-3 md:text-sm"
            >
                {types.find((type) => type.value === typeSelected)?.label || 'All'}
                <CaretDown className="text-sm text-blue-main md:text-lg" weight="bold" />
            </button>
            {showFilter && (
                <div className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ul className="py-1">
                        {types.map((type, index) => (
                            <li
                                onClick={() => handleTypeChange(type.value)}
                                key={index}
                                className="cursor-pointer bg-white px-4 py-2 text-sm text-gray-900 duration-300 hover:bg-gray-100 "
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
