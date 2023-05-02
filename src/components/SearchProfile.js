import { MagnifyingGlass, X } from '@phosphor-icons/react';

function SearchProfile({ searchKeyword, setSearchKeyword, handleSearch }) {
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
        <div className="mx-4 flex w-full items-center py-1 md:mx-8 md:h-full md:py-3">
            <MagnifyingGlass
                className="mr-1 block h-6 cursor-pointer text-2xl text-gray-400 md:mr-2 md:text-xl"
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
                } mr-4 h-6 cursor-pointer text-xl text-gray-400 duration-200 hover:text-blue-main`}
                weight="bold"
            />
            <button
                onClick={handleClickSearch}
                className="ml-2 flex h-full items-center justify-center gap-x-1.5 rounded-md bg-blue-main px-3 py-2 text-xs font-semibold text-white shadow-sm transition duration-300  hover:ring-4 hover:ring-blue-main-ring md:ml-4 md:text-sm"
            >
                Search
            </button>
        </div>
    );
}

export default SearchProfile;
