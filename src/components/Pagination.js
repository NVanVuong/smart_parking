import { useEffect, useState } from 'react';

function Pagination({ items, totalPages, currentPage, setCurrentPage }) {
    const [itemsLength, setItemsLength] = useState(items.length);

    useEffect(() => {
        let newCurrentPage;
        if (items.length === itemsLength + 1) {
            setItemsLength(items.length);
            newCurrentPage = totalPages;
        } else if (items.length === itemsLength - 1) {
            setItemsLength(items.length);
            newCurrentPage = currentPage === totalPages ? Math.max(currentPage - 1, 1) : currentPage;
        } else if (items.length < itemsLength) {
            newCurrentPage = 1;
        } else {
            newCurrentPage = currentPage;
        }
        setCurrentPage(newCurrentPage);
    }, [items.length]);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map((number) => {
            return (
                <li
                    key={number}
                    className={`${
                        currentPage === number && 'rounded-md border-none bg-[#2ab7df] text-white hover:text-white'
                    } mx-1 flex h-10 w-10 items-center justify-center rounded-md  px-3 py-2 transition duration-300 hover:text-[#2ab7df] hover:ring-4 hover:ring-[#2ab8df66]`}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </li>
            );
        });
    };

    return (
        <ul className="fixed bottom-20 flex h-10 w-fit font-medium text-gray-500 md:bottom-6">
            <li
                className={`${
                    currentPage === 1 && 'pointer-events-none text-gray-300'
                } mx-1 flex h-10 rounded-md px-3 py-2 transition duration-300  hover:text-[#2ab7df] hover:ring-4 hover:ring-[#2ab8df66]`}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Prev
            </li>
            <>{renderPageNumbers()}</>
            <li
                className={`${
                    currentPage === totalPages && 'pointer-events-none text-gray-300'
                } mx-1 flex h-10 rounded-md  px-3 py-2 transition duration-300 hover:text-[#2ab7df] hover:ring-4 hover:ring-[#2ab8df66]`}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </li>
        </ul>
    );
}

export default Pagination;
