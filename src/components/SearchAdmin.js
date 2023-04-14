import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import FilterAccount from './FilterAccount';
import FilterParkingSite from './FilterParkingSite';

function SearchAdmin({
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
        <div className="ml-8 flex h-full w-full items-center py-3">
            <MagnifyingGlass className="mr-2 h-6 cursor-pointer text-xl text-gray-400" weight="bold" />
            <input
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Search..."
                type="text"
                name="search"
                id="searchInput"
                className=" h-[100%] w-full rounded-md text-base focus:outline-none"
            />
            <X
                onClick={handleClickClearInput}
                className={`${
                    searchKeyword === '' && 'hidden'
                } mr-4 h-6 cursor-pointer text-xl text-gray-400 duration-200 hover:text-blue-main`}
                weight="bold"
            />
            {pageName === 'accounts' ? (
                <FilterAccount showFilter={showFilter} setShowFilter={setShowFilter} type={type} setType={setType} />
            ) : (
                <FilterParkingSite
                    showFilter={showFilter}
                    setShowFilter={setShowFilter}
                    setPrice={setPrice}
                    setAvailable={setAvailable}
                    price={price}
                    available={available}
                    handleSearch={handleSearch}
                />
            )}
            <button
                onClick={handleClickSearch}
                className="ml-4 flex h-full items-center justify-center gap-x-1.5 rounded-md bg-blue-main px-3 py-2 text-sm font-semibold text-white shadow-sm  transition duration-300 hover:ring-4 hover:ring-blue-main-ring"
            >
                Search
            </button>
        </div>
    );
}

export default SearchAdmin;
