import { MagnifyingGlass } from '@phosphor-icons/react';

function SearchAdmin({ handleInputChange, handleKeyDown }) {
    return (
        <div className="ml-8 flex h-full w-full items-center">
            <MagnifyingGlass className="mr-2 h-6 cursor-pointer text-xl text-gray-400" weight="bold" />
            <input
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Search..."
                type="text"
                name="search"
                id="search"
                className=" h-[100%] w-full rounded-md text-base focus:outline-none"
            />
        </div>
    );
}

export default SearchAdmin;
