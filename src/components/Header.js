import React from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="flex items-center justify-between py-[10px] px-[15px]">
            <Link to="/" className="block border-0 bg-transparent bg-contain bg-no-repeat p-0">
                <img src={logo} alt="Best Parking Logo" className="h-[50px] w-[250px]" />
            </Link>
            <nav role="navigation" className="flex flex-row items-center">
                <Link
                    to="/admin"
                    className="mr-6 text-xs font-bold uppercase tracking-wider  text-blue-main hover:text-gray-400"
                >
                    ADMIN
                </Link>
                <Link
                    to="/login"
                    className="mr-6 text-xs font-bold uppercase tracking-wider  text-blue-main hover:text-gray-400"
                >
                    SIGN IN
                </Link>
                <Link
                    href="/sign-up"
                    className="mr-2 rounded-[5px] border-2 border-solid border-blue-main py-[15px] px-[10px] text-center text-xs font-medium uppercase leading-none tracking-wider text-blue-main hover:border-gray-400 hover:text-gray-400"
                >
                    SIGN UP
                </Link>
            </nav>
        </header>
    );
}

export default Header;
