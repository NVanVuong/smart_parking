import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserAlt, FaCarAlt, FaTicketAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
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
    ];

    return (
        <div
            onClick={handleClick}
            className={`${
                open ? 'w-60' : 'w-20'
            } flex h-screen flex-col justify-between bg-gray-100 p-4 transition-all duration-300`}
        >
            <div>
                <Link to="/">
                    <img
                        src={open ? logo : small_logo}
                        className={`h-12 w-auto cursor-pointer transition duration-300`}
                        alt="Logo Best Parking"
                    />
                </Link>
                <ul className="mt-6">
                    {menus.map((menu, index) => {
                        const isActive = location.pathname === menu.path;
                        return (
                            <Link to={menu.path} key={index}>
                                <li
                                    className={`${
                                        isActive && 'bg-gray-200 shadow-md'
                                    } my-2 flex cursor-pointer items-center rounded-lg p-3 text-base font-normal transition duration-300 hover:bg-gray-200`}
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
            <Link
                className={`my-2 flex cursor-pointer items-center rounded-lg bg-gray-200 p-3 text-base font-normal hover:bg-gray-300 hover:shadow-md`}
            >
                <span className="mr-3 text-2xl">
                    <BiLogOut />
                </span>
                <span
                    className={`${
                        open ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                    } select-none whitespace-nowrap transition duration-300`}
                >
                    Log out
                </span>
            </Link>
        </div>
    );
}

export default SideBar;
