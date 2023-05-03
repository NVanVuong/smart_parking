import { useEffect } from 'react';
import { MapPin, MagnifyingGlass, X } from '@phosphor-icons/react';

function Search({
    mapRef,
    getParkingNearBy,
    distance,
    setCurrentFilter,
    setCenter,
    searchKeyword,
    setSearchKeyword,
    handleSearch,
}) {
    const handleLoad = async () => {
        const search = window.placeSearch({
            key: '7ahjYGQ2gE1llpVDhdf0omSjooM8rgxt',
            container: document.getElementById('search-input'),
            // useDeviceLocation: true,
            collection: ['poi', 'airport', 'address', 'adminArea', 'city', 'country'],
        });

        search.on('change', async (e) => {
            console.log(e.result);
            const location = e.result.latlng;
            setCenter([location.lat, location.lng]);
            await getParkingNearBy([location.lat, location.lng], distance);
            mapRef.current.flyTo([location.lat, location.lng], 14);
            setCurrentFilter('closest');
            search.setVal(e.result.name);
            search.close();
        });

        const clearButton = document.getElementById('clear-button');
        clearButton.addEventListener('click', () => {
            search.setVal('');
            setCurrentFilter('all');
        });
    };

    useEffect(() => {
        handleLoad();
        // eslint-disable-next-line
    }, []);

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
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        setSearchKeyword('');
        handleSearch('');
    };

    const handleClickSearch = () => {
        handleSearch(searchKeyword);
        console.log(searchKeyword);
    };

    return (
        <div className="flex h-[70px] w-full items-center bg-[#294168] py-4">
            <div className="mb-[5px] flex w-full px-[15px]">
                <MapPin className="mt-[10px] h-[30px] w-5 border-b-[1px] border-[#fff]" color="#ef4555" weight="fill" />
                <input
                    id="search-input"
                    className="placeholder-text-xs mt-[10px] h-[30px] w-full flex-1 grow appearance-none  border-[#fff] bg-transparent px-[12px] text-sm text-white placeholder-gray-300 caret-white outline-none placeholder:font-medium focus:outline-none"
                    placeholder="Search a address or parking site"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <X
                    id="clear-button"
                    onClick={handleClickClearInput}
                    className={`${
                        searchKeyword === '' ? 'invisible' : 'visible'
                    } absolute right-11 mt-[10px] h-[30px] w-7 cursor-pointer border-b-[1px] border-[#fff] bg-inherit px-[6px] py-[1px] text-white duration-200 hover:text-[#ef4555]`}
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

export default Search;
