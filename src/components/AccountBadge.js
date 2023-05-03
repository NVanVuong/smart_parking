import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

function AccountBadge({ auth }) {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, setOpen]);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={`${
                    open && 'text-blue-main'
                } group flex items-center rounded-[5px] text-center text-xs font-bold leading-none tracking-wider text-black transition hover:text-blue-main  active:scale-105 md:text-sm`}
            >
                {auth?.account?.username}
                <FaUserCircle className="ml-1 text-xl md:text-2xl" />
            </button>
            {open && (
                <div className="absolute right-2 top-6 z-[99999] mt-2 w-40 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ul onClick={() => setOpen(!open)} className="py-1">
                        <Link
                            to={`/profile/${auth?.account?.username}`}
                            className="flex cursor-pointer items-center space-x-4 bg-white px-4 py-3 text-sm text-gray-900 duration-300 hover:bg-gray-100 "
                        >
                            <ImProfile className="mr-3 text-lg" />
                            Profile
                        </Link>
                        {auth.account?.type === 'admin' && (
                            <Link
                                to="/admin"
                                className="flex cursor-pointer items-center bg-white px-4 py-3 text-sm text-gray-900 duration-300 hover:bg-gray-100"
                            >
                                <MdOutlineAdminPanelSettings className="mr-3 text-xl" />
                                Admin
                            </Link>
                        )}
                        <Link
                            onClick={auth?.logout}
                            to="/"
                            className="flex cursor-pointer items-center bg-white px-4 py-3 text-sm text-gray-900 duration-300 hover:bg-gray-100 "
                        >
                            <FiLogOut className="mr-3 text-lg" />
                            Logout
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AccountBadge;
