import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserAlt, FaCarAlt, FaTicketAlt } from 'react-icons/fa';
import { BiLogOut, BiMenu } from 'react-icons/bi';
import logo from '../assets/images/logo.png';
import small_logo from '../assets/images/small-logo.png';

function SideBar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            setOpen(!open);
        }
    };

    const menus = [
        { title: 'Accounts', path: '/admin/accounts', icon: <FaUserAlt /> },
        { title: 'Pariking Sites', path: '/admin/parkingsites', icon: <FaCarAlt /> },
        { title: 'Tickets', path: '/admin/tickets', icon: <FaTicketAlt /> },
        { title: 'Log out', path: '/admin/logout', icon: <BiLogOut /> },
    ];

    return (
        <div
            onClick={handleClick}
            className={`${
                open ? 'md:w-60' : 'md:w-20'
            } h-18 fixed bottom-0 z-50 w-full items-center justify-between bg-gray-100 py-2 px-4 transition-all duration-300 md:static md:flex md:h-screen md:grow-0 md:flex-col md:p-4`}
        >
            <div>
                <Link to="/">
                    <img
                        src={open ? logo : small_logo}
                        className={`hidden h-12 w-fit cursor-pointer transition duration-300 md:block`}
                        alt="Logo Best Parking"
                    />
                </Link>
                <ul className={`flex flex-row justify-around md:mt-6 md:flex-col`}>
                    {menus.map((menu, index) => {
                        const isActive = location.pathname === menu.path;
                        return (
                            <Link to={menu.path} key={index}>
                                <li
                                    className={`${
                                        isActive && 'bg-gray-200 shadow-md'
                                    } flex cursor-pointer flex-col items-center rounded-lg p-3 text-xs font-normal transition duration-300 hover:bg-gray-200 md:my-2 md:w-auto md:flex-row md:text-base`}
                                >
                                    <span
                                        className={`${
                                            isActive && 'text-blue-main'
                                        } text-sm transition duration-300 md:mr-3 md:text-2xl`}
                                    >
                                        {menu.icon}
                                    </span>
                                    <span
                                        className={`${isActive && 'font-medium text-blue-main'} ${
                                            open ? 'md:translate-x-0 md:opacity-100' : 'md:-translate-x-12 md:opacity-0'
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
            {/* <Link
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
            </Link> */}
        </div>
    );
}

export default SideBar;
