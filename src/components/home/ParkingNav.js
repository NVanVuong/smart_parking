export default function ParkingNav({ currentFilter, setCurrentFilter }) {
    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    return (
        <ul className="flex h-10 items-end justify-center space-x-4 border-b px-4 pb-1.5 md:space-x-3">
            <li
                className={`${
                    currentFilter === 'all' ? ' border-blue-main' : 'border-transparent'
                }  cursor-pointer border-b-2 px-2 pb-1 text-sm font-medium text-gray-500 transition-all duration-500 hover:text-blue-main md:px-1 lg:px-2`}
                onClick={() => handleFilterChange('all')}
            >
                View all
            </li>
            <li
                className={`${
                    currentFilter === 'closest' ? 'border-blue-main ' : 'border-transparent'
                } cursor-pointer border-b-2 px-2 pb-1 text-sm font-medium text-gray-500  transition-all duration-500 hover:text-blue-main md:px-1 lg:px-2 `}
                onClick={() => handleFilterChange('closest')}
            >
                Closest
            </li>
            <li
                className={`${
                    currentFilter === 'cheapest' ? 'border-blue-main ' : 'border-transparent'
                } cursor-pointer border-b-2 px-2 pb-1 text-sm font-medium text-gray-500  transition-all duration-500 hover:text-blue-main md:px-1 lg:px-2 `}
                onClick={() => handleFilterChange('cheapest')}
            >
                Cheapest
            </li>
            <li
                className={`${
                    currentFilter === 'detail' ? 'border-blue-main text-gray-500' : 'border-transparent text-gray-400'
                } pointer-events-none cursor-pointer border-b-2  px-2 pb-1 text-sm font-medium  transition-all duration-500 hover:text-blue-main md:px-1 lg:px-2`}
                onClick={() => handleFilterChange('detail')}
            >
                Detail
            </li>
        </ul>
    );
}
