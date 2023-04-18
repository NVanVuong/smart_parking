import React from 'react';
import { MapPin, MagnifyingGlass } from '@phosphor-icons/react';
import { BiCurrentLocation } from 'react-icons/bi';

function SearchUser() {
    return (
        <div className="flex h-[70px] items-center bg-[#1b3764] py-4">
            <div className="mb-[5px] flex px-[15px]">
                <MapPin
                    className="mt-[10px] h-[30px] border-b-[1px] border-[#fff]"
                    color="#ef4555"
                    size={16}
                    weight="fill"
                />
                <input
                    className="placeholder-text-xs mt-[10px] h-[30px] w-[310px] border-b-[1px] border-[#fff] bg-transparent px-[12px] text-sm text-white placeholder-gray-300 caret-white outline-none placeholder:font-medium focus:outline-none"
                    placeholder="Search Address or Place"
                    type="text"
                />
                <MagnifyingGlass
                    className="mt-[10px] h-[30px] w-[28px] cursor-pointer border-b-[1px] border-[#fff] px-[6px] py-[1px]"
                    color="#fff"
                    size={12}
                    weight="bold"
                />
            </div>
            <BiCurrentLocation className="h-full w-auto px-1 py-2 text-xl text-white" />
        </div>
    );
}

export default SearchUser;
