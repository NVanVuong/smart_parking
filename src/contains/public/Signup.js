import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks/auth';
import apiConfig from '~/api/apiConfig';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const [user, setUser] = useState({ username: '', password: '', confirmPassword: '', phone: '', name: '' });
    const [mes, setMes] = useState({ username: '', phone: '', confimPassword: '' });

    useEffect(() => {
        if (auth.token) navigate('/', { replace: true });
        // eslint-disable-next-line
    }, [auth.token]);

    const redirectPath = location.state?.path || '/';
    console.log(redirectPath);

    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        const cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
        document.cookie = cookie;
    };

    const handleCheckbeforeSubmit = (event) => {
        let check = true;
        const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!phoneNumberRegex.test(user.phone)) {
            check = false;
            setMes((prev) => ({ ...prev, phone: 'Phonenumber is not valid!!!' }));
            setUser((prevAccount) => ({ ...prevAccount, phone: '' }));
        }
        if (user.password !== user.confirmPassword) {
            console.log(user.password, user.confirmPassword);
            setUser((prevAccount) => ({ ...prevAccount, password: '' }));
            setUser((prevAccount) => ({ ...prevAccount, confirmPassword: '' }));
            setMes((prev) => ({ ...prev, confimPassword: 'Confirm password is not same as password!!!' }));
            check = false;
        }
        return check;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user);
        console.log(handleCheckbeforeSubmit());
        if (handleCheckbeforeSubmit())
            axios
                .post(`${apiConfig.baseURL}auth/signup`, user)
                .then((response) => {
                    console.log('Response:', response.headers);
                    const jwt = response.data?.data.token;
                    console.log(jwt);
                    setCookie('jwt', jwt, 5);

                    auth.login(jwt, response.data?.data.user);
                    navigate(redirectPath, { replace: true });
                })
                .catch((error) => {
                    if (error?.response?.status === 500) {
                        console.log(error.response.data);
                        if (error.response.data.message.includes('phone')) {
                            setMes((prev) => ({ ...prev, phone: 'Phonenumber is duplicate!!!' }));
                            setUser((prevAccount) => ({ ...prevAccount, phone: '' }));
                        }
                        if (error.response.data.message.includes('username')) {
                            setMes((prev) => ({ ...prev, username: 'username is duplicate!!!' }));
                            setUser((prevAccount) => ({ ...prevAccount, username: '' }));
                        }
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error);
                });
    };
    return (
        <form onSubmit={handleSubmit} className="relative flex min-h-screen flex-col justify-center overflow-hidden">
            <div className="m-auto w-full rounded-md bg-white p-6 shadow-md lg:max-w-xl">
                <h1 className="text-center text-3xl font-semibold text-purple-700 underline">Sign in</h1>
                <div className="mb-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                        Name
                    </label>
                    <input
                        required
                        onFocus={() => setMes('')}
                        type="text"
                        value={user.name}
                        onChange={(e) => {
                            setUser((prev) => ({ ...prev, name: e.target.value }));
                        }}
                        className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                        Phone
                    </label>
                    <input
                        required
                        onFocus={() => setMes('')}
                        type="text"
                        value={user.phone}
                        onChange={(e) => {
                            setUser((prev) => ({ ...prev, phone: e.target.value }));
                        }}
                        className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                    />
                </div>
                <p className="pt-4 text-sm text-red-500">{mes.phone}</p>

                <div className="mb-2">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                        Username
                    </label>
                    <input
                        required
                        onFocus={() => setMes('')}
                        type="text"
                        value={user.username}
                        onChange={(e) => {
                            setUser((prev) => ({ ...prev, username: e.target.value }));
                        }}
                        className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                    />
                </div>
                <p className="pt-4 text-sm text-red-500">{mes.username}</p>

                <div className="mb-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                        Password
                    </label>
                    <input
                        required
                        type="password"
                        onFocus={() => setMes('')}
                        value={user.password}
                        onChange={(e) => {
                            setUser((prev) => ({ ...prev, password: e.target.value }));
                        }}
                        className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                        Confirm Password
                    </label>
                    <input
                        required
                        type="password"
                        onFocus={() => setMes('')}
                        value={user.confirmPassword}
                        onChange={(e) => {
                            setUser((prev) => ({ ...prev, confirmPassword: e.target.value }));
                        }}
                        className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                    />
                </div>
                <p className="pt-4 text-sm text-red-500">{mes.confimPassword}</p>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full transform rounded-md bg-purple-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none"
                    >
                        Sign up
                    </button>
                    <p className="pt-4 text-sm text-red-500"></p>
                </div>
            </div>
        </form>
    );
}

export default Signup;
