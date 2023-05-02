import { useState } from 'react';
import { useAuth } from '~/hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import { BiUserPin, BiLogOut } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

function ProfileBar() {
    const auth = useAuth();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            setOpen(!open);
        }
    };

    const menus = [
        { title: 'Information', path: `/profile/${auth?.account?.username}`, icon: <BiUserPin /> },
        { title: 'Password', path: `/profile/password`, icon: <RiLockPasswordLine /> },
        { title: 'Reservation', path: `/profile/reservation`, icon: <HiOutlineTicket /> },
        { title: 'Log out', path: '/', icon: <BiLogOut /> },
    ];

    return (
        <>
            <div
                onClick={handleClick}
                className={`${
                    open ? 'w-52' : 'w-20'
                } hidden h-full grow-0 flex-col justify-between  bg-white p-4 transition-all duration-300 md:flex `}
            >
                <ul>
                    {menus
                        .filter((menu) => menu.title !== 'Log out')
                        .map((menu, index) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <Link to={menu.path} key={index}>
                                    <li
                                        className={`${
                                            isActive && 'bg-gray-200 shadow-md'
                                        }  my-2 flex cursor-pointer items-center rounded-lg p-3 text-base font-normal transition duration-300 hover:bg-gray-200`}
                                    >
                                        <span
                                            className={`${
                                                isActive && 'text-blue-main'
                                            } mr-3 text-2xl transition duration-300`}
                                        >
                                            {menu.icon}
                                        </span>
                                        <span
                                            className={`${isActive && 'font-medium text-blue-main'} ${
                                                open ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                                            } select-none whitespace-nowrap text-base transition duration-300`}
                                        >
                                            {menu.title}
                                        </span>
                                    </li>
                                </Link>
                            );
                        })}
                </ul>
                <Link
                    onClick={auth.logout}
                    to="/"
                    className={`my-2 hidden cursor-pointer items-center rounded-lg bg-gray-200 p-3 text-base font-normal hover:bg-gray-300 hover:shadow-md md:mt-6 md:flex`}
                >
                    <span className="mr-3 text-2xl">
                        <BiLogOut />
                    </span>
                    <span
                        className={`${
                            open ? 'md:translate-x-0 md:opacity-100' : 'md:-translate-x-12 md:opacity-0'
                        } select-none whitespace-nowrap transition duration-300`}
                    >
                        Log out
                    </span>
                </Link>
            </div>
            <div
                onClick={handleClick}
                className={`h-18 fixed bottom-0 z-50 block w-full items-center justify-between  bg-white py-2 px-4 transition-all duration-300 md:hidden `}
            >
                <div>
                    <ul className={`flex flex-row justify-around`}>
                        {menus.map((menu, index) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <Link onClick={menu.title === 'Log out' && auth.logout} to={menu.path} key={index}>
                                    <li
                                        className={`${
                                            isActive && 'bg-gray-200 shadow-md'
                                        } flex cursor-pointer flex-col items-center rounded-lg p-3 text-xs font-normal transition duration-300 hover:bg-gray-200 `}
                                    >
                                        <span
                                            className={`${
                                                isActive && 'text-blue-main'
                                            } text-sm transition duration-300`}
                                        >
                                            {menu.icon}
                                        </span>
                                        <span
                                            className={`${
                                                isActive && 'font-medium text-blue-main'
                                            } select-none whitespace-nowrap transition duration-300`}
                                        >
                                            {menu.title}
                                        </span>
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ProfileBar;
