import React from 'react';
import { MapPin, MagnifyingGlass, ArrowRight, PencilSimple } from '@phosphor-icons/react';

function SearchUser() {
    return (
        <div className="flex h-[70px] items-center bg-[#1b3764]">
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
            <div className="ml-[10px] flex items-center text-white">
                <div>
                    <p className="mt-[5px] text-xs font-medium">ARRIVE AFTER</p>
                    <div className="mt-[5px] flex items-center text-sm font-bold">
                        <p>TUE, MAR 14</p>
                        <span className="mx-[10px]"> | </span>
                        <p>3:00 PM</p>
                        <PencilSimple size={16} color="#fff" weight="fill" className="ml-[15px]" />
                    </div>
                </div>
                <ArrowRight size={22} color="#fff" weight="bold" className="mx-[40px]" />
                <div>
                    <p className="mt-[5px] text-xs font-medium">EXIT BEFORE</p>
                    <div className="mt-[5px] flex items-center text-sm font-bold">
                        <p>TUE, MAR 14 </p>
                        <span className="mx-[10px]"> | </span>
                        <p> 4:00 PM</p>
                        <PencilSimple size={16} color="#fff" weight="fill" className="ml-[15px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchUser;
