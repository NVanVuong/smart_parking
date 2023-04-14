import { useEffect } from 'react';

function Pagination({ items, totalPages, currentPage, setCurrentPage }) {
    useEffect(() => {
        setCurrentPage(1);
        // eslint-disable-next-line
    }, [items]);

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
                    } mx-1 flex h-10 w-10 items-center justify-center rounded-md px-3 py-2 transition duration-300 hover:text-[#2ab7df] hover:ring-4 hover:ring-[#2ab8df66]`}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </li>
            );
        });
    };

    return (
        <ul className="fixed bottom-5 flex font-medium text-gray-500">
            <li
                className={`${
                    currentPage === 1 && 'pointer-events-none text-gray-300'
                } mx-1 flex h-10 rounded-md bg-white px-3 py-2 transition duration-300  hover:text-[#2ab7df] hover:ring-4 hover:ring-[#2ab8df66]`}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Prev
            </li>
            <>{renderPageNumbers()}</>
            <li
                className={`${
                    currentPage === totalPages && 'pointer-events-none text-gray-300'
                } mx-1 flex h-10 rounded-md bg-white px-3 py-2 transition duration-300 hover:text-[#2ab7df] hover:ring-4 hover:ring-[#2ab8df66]`}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </li>
        </ul>
    );
}

export default Pagination;
