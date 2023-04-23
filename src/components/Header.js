import { useRef, useState, useEffect } from 'react';
import smart_parking_rec from '../assets/images/smart_parking_rec.png';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks/auth';
import { AiFillCaretDown, AiOutlineUser } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
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
        <header className="flex items-center justify-between px-[15px]">
            <Link to="/" className="block border-0 bg-transparent bg-contain bg-no-repeat p-0">
                <img src={smart_parking_rec} alt="Best Parking Logo" className="h-16 w-auto" />
            </Link>
            <nav role="navigation" className="flex flex-row items-center">
                {auth.account?.type === 'admin' ? (
                    <Link
                        to="/admin"
                        className="mr-6 rounded py-3.5 px-2.5 text-xs font-bold tracking-wider text-blue-main duration-300 hover:ring-4 hover:ring-blue-main-ring"
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
                            className="mr-6 rounded py-3.5 px-2.5  text-xs font-bold tracking-wider text-blue-main duration-300 hover:ring-4 hover:ring-blue-main-ring"
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
                            className="group mr-2 flex rounded-[5px] text-center text-xs font-bold leading-none tracking-wider text-black  transition hover:text-blue-main focus:text-blue-main"
                        >
                            {auth.account.username}
                            <AiFillCaretDown className="invisible ml-0.5 group-hover:visible" />
                        </button>
                        {open && (
                            <div className="absolute right-2 top-3 z-[99999] mt-2 w-28 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <ul className="py-1">
                                    <li className="flex cursor-pointer items-center space-x-4 bg-white px-4 py-2 text-sm text-gray-900 duration-300 hover:bg-gray-100 ">
                                        <AiOutlineUser className="mr-2 text-lg" />
                                        Profile
                                    </li>
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
