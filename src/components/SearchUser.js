import React from 'react';
import { MapPin, MagnifyingGlass, X } from '@phosphor-icons/react';

function SearchUser({ searchKeyword, setSearchKeyword, handleSearch }) {
    const handleChange = (e) => {
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

    const handleClickClearInput = () => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        setSearchKeyword('');
        handleSearch('');
    };

    const handleClickSearch = () => {
        handleSearch(searchKeyword);
    };

    return (
        <div className="flex h-[70px] w-full items-center bg-[#294168] py-4">
            <div className="mb-[5px] flex w-full px-[15px]">
                <MapPin className="mt-[10px] h-[30px] w-5 border-b-[1px] border-[#fff]" color="#ef4555" weight="fill" />

                <input
                    id="searchInput"
                    className="placeholder-text-xs mt-[10px] h-[30px] w-full flex-1 grow appearance-none border-b-[1px] border-[#fff] bg-transparent px-[12px] text-sm text-white placeholder-gray-300 caret-white outline-none placeholder:font-medium focus:outline-none"
                    placeholder="Search a address or parking site"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type="search"
                />

                <X
                    onClick={handleClickClearInput}
                    className={`${
                        searchKeyword === '' && 'hidden'
                    } absolute right-11 mt-[10px] h-[30px] w-7 cursor-pointer border-b-[1px] border-[#fff] px-[6px] py-[1px] text-white duration-200 hover:text-[#ef4555]`}
                    weight="bold"
                />
                <MagnifyingGlass
                    className="mt-[10px] h-[30px] w-7 cursor-pointer border-b-[1px] border-[#fff] px-[6px] py-[1px] text-white  duration-200 hover:text-blue-main"
                    weight="bold"
                    onClick={handleClickSearch}
                />
            </div>
        </div>
    );
}

export default SearchUser;
