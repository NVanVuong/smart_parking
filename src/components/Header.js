import { useRef, useState, useEffect } from 'react';
import smart_parking_rec from '../assets/images/smart_parking_rec.png';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks/auth';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
function Header() {
    const auth = useAuth();
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
        <header className="flex items-center justify-between px-[15px] shadow-md md:shadow-none">
            <Link to="/" className="block border-0 bg-transparent bg-contain bg-no-repeat p-0">
                <img src={smart_parking_rec} alt="Best Parking Logo" className="h-16 w-auto" />
            </Link>
            <nav role="navigation" className="flex flex-row items-center">
                {auth.account?.type === 'admin' ? (
                    <Link
                        to="/admin"
                        className="mr-2 rounded border-2 border-solid border-blue-main py-3 px-2.5 text-xs font-bold tracking-wider text-blue-main duration-300 hover:ring-4 hover:ring-blue-main-ring md:mr-6"
                    >
                        ADMIN
                    </Link>
                ) : (
                    <></>
                )}
                {!auth.token ? (
                    <>
                        <Link
                            to="/login"
                            className="mr-2 rounded py-3.5 px-2.5 text-xs  font-bold tracking-wider text-blue-main duration-300 hover:ring-4 hover:ring-blue-main-ring md:mr-6"
                        >
                            SIGN IN
                        </Link>
                        <Link
                            to="/signup"
                            className="mr-2 rounded border-2 border-solid border-blue-main py-3.5 px-2.5 text-center text-xs font-medium uppercase leading-none tracking-wider text-blue-main duration-300 hover:ring-4 hover:ring-blue-main-ring"
                        >
                            SIGN UP
                        </Link>
                    </>
                ) : (
                    <div ref={ref} className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className={`${
                                open && 'text-blue-main'
                            } group mr-2 flex items-center rounded-[5px] text-center text-sm font-bold leading-none tracking-wider text-black transition  hover:text-blue-main active:scale-105`}
                        >
                            {auth?.account?.username}
                            <FaUserCircle className="ml-1 text-2xl" />
                        </button>
                        {open && (
                            <div className="absolute right-2 top-6 z-[99999] mt-2 w-36 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <ul onClick={() => setOpen(!open)} className="py-1">
                                    <Link
                                        to={`/${auth.account.username}`}
                                        className="flex cursor-pointer items-center space-x-4 bg-white px-4 py-2 text-sm text-gray-900 duration-300 hover:bg-gray-100 "
                                    >
                                        <ImProfile className="mr-2 text-lg" />
                                        Profile
                                    </Link>
                                    <li
                                        onClick={auth.logout}
                                        className="flex cursor-pointer items-center bg-white px-4 py-2 text-sm text-gray-900 duration-300 hover:bg-gray-100 "
                                    >
                                        <FiLogOut className="mr-2 text-lg" />
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
