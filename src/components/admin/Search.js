import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import FilterAccount from '../filter/FilterAccount';
import FilterParkingSite from '../filter/FilterParkingSite';
import smart_parking_square from '~/assets/images/smart_parking_square.png';

function Search({
    searchKeyword,
    setSearchKeyword,
    type,
    setType,
    price,
    setPrice,
    available,
    setAvailable,
    handleSearch,
}) {
    const [showFilter, setShowFilter] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const pageName = currentPath.split('/').pop();

    useEffect(() => {
        handleSearch(searchKeyword);
        // eslint-disable-next-line
    }, [type]);

    const handleInputChange = (e) => {
        if (e.target.value === '') {
            setSearchKeyword('');
            handleSearch('');
        } else {
            setSearchKeyword(e.target.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchKeyword);
        }
    };

    const handleClickSearch = () => {
        handleSearch(searchKeyword);
        setShowFilter(false);
    };

    const handleClickClearInput = () => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        setSearchKeyword('');
        handleSearch('');
    };

    return (
        <div className="ml-4 flex h-full w-full items-center py-2 md:ml-8 md:py-3">
            <div className="mr-2 h-full min-w-fit md:hidden">
                <Link className="" to="/">
                    <img
                        src={smart_parking_square}
                        className={`block h-full cursor-pointer transition duration-300`}
                        alt="Logo Best Parking"
                    />
                </Link>
            </div>
            <MagnifyingGlass
                className="mr-1 block h-6 cursor-pointer text-3xl text-gray-400 md:mr-2 md:text-xl"
                weight="bold"
            />
            <input
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Search..."
                type="text"
                name="search"
                id="searchInput"
                className="h-[100%] w-full rounded-md text-sm placeholder:text-sm focus:outline-none md:text-base"
            />
            <X
                onClick={handleClickClearInput}
                className={`${
                    searchKeyword === '' && 'hidden'
                } mr-4 h-6 cursor-pointer text-3xl text-gray-400 duration-200 hover:text-blue-main md:text-xl`}
                weight="bold"
            />
            {pageName === 'accounts' ? (
                <FilterAccount showFilter={showFilter} setShowFilter={setShowFilter} type={type} setType={setType} />
            ) : pageName === 'parkingsites' ? (
                <FilterParkingSite
                    showFilter={showFilter}
                    setShowFilter={setShowFilter}
                    setPrice={setPrice}
                    setAvailable={setAvailable}
                    price={price}
                    available={available}
                    handleSearch={handleSearch}
                />
            ) : null}
            <button
                onClick={handleClickSearch}
                className="ml-2 flex h-full items-center justify-center gap-x-1.5 rounded-md bg-blue-main px-3 py-2 text-xs font-semibold text-white shadow-sm transition duration-300  hover:ring-4 hover:ring-blue-main-ring md:ml-4 md:text-sm"
            >
                Search
            </button>
        </div>
    );
}

export default Search;
