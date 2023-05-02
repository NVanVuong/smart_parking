import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '~/hooks/auth';
import apiConfig from '~/api/apiConfig';
import axios from 'axios';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const [account, setAccount] = useState({ username: '', password: '' });
    const [mes, setMes] = useState('');
    useEffect(() => {
        console.log(auth.token);
        if (auth.token) navigate('/', { replace: true });
        // eslint-disable-next-line
    }, [auth.token]);
    const redirectPath = location.state?.path || '/';
    console.log(redirectPath);
    console.log(account);

    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        const cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
        document.cookie = cookie;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(account);
        axios
            .post(`${apiConfig.baseURL}auth/login`, account)
            .then((response) => {
                console.log('Response:', response.headers);
                const jwt = response.data?.data.token;
                console.log(jwt);
                setCookie('jwt', jwt, 5);
                auth.login(jwt, response.data?.data.account);
                navigate(redirectPath, { replace: true });
            })
            .catch((response) => {
                if (response.response.status === 401) setMes('Incorrect username or password!');
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative my-auto mx-auto flex h-fit w-5/6 flex-col justify-center overflow-hidden rounded-md shadow-md md:w-1/3"
        >
            <div className="m-auto w-full bg-white p-6 lg:max-w-xl">
                <h1 className="mb-2 text-center text-3xl font-semibold text-blue-main">Log in</h1>
                <div className="mb-2">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                        Username
                    </label>
                    <input
                        onFocus={() => setMes('')}
                        type="text"
                        value={account.username}
                        onChange={(e) => {
                            setAccount((prev) => ({ ...prev, username: e.target.value }));
                        }}
                        className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-main focus:outline-none focus:ring focus:ring-blue-main-ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                        Password
                    </label>
                    <input
                        type="password"
                        onFocus={() => setMes('')}
                        value={account.password}
                        onChange={(e) => {
                            setAccount((prev) => ({ ...prev, password: e.target.value }));
                        }}
                        className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-main focus:border-r-indigo-100 focus:outline-none focus:ring focus:ring-blue-main focus:ring-opacity-40"
                    />
                </div>
                <Link to={'/login'} className="text-xs text-blue-main hover:underline">
                    Forget Password?
                </Link>
                <div className="mt-2">
                    <button
                        type="submit"
                        className="w-full transform rounded-md bg-blue-main px-4 py-2 tracking-wide text-white shadow-md transition-colors duration-200 hover:bg-blue-main-hover focus:bg-blue-main-ring focus:outline-none"
                    >
                        Log in
                    </button>
                    <p className="pt-4 text-sm text-red-500">{mes}</p>
                </div>

                <p className="mt-3 text-center text-xs font-light text-gray-700">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-blue-main hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    );
}

export default Login;
