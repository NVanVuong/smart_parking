import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks/auth';
function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const [account, setAccount] = useState({ username: '', password: '' });
    useEffect(() => {       
        console.log(auth.token);
        if (auth.token) navigate('/', { replace: true });
    }, [auth.token]);
    const redirectPath = location.state?.path || '/';
    console.log(redirectPath);

    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        const cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
        document.cookie = cookie;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(account);
        axios
            .post('http://127.0.0.1:5000/api/auth/login', account)
            .then((response) => {
                console.log('Response:', response.headers);
                const jwt = response.data?.data.token;
                console.log(jwt);
                setCookie('jwt', jwt, 5);
                auth.login(jwt, response.data?.data.account);
                navigate(redirectPath, { replace: true });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input
                    type="text"
                    value={account.username}
                    onChange={(e) => {
                        setAccount((prev) => ({ ...prev, username: e.target.value }));
                    }}
                />
            </label>
            <label>
                <p>Password</p>
                <input
                    type="password"
                    value={account.password}
                    onChange={(e) => {
                        setAccount((prev) => ({ ...prev, password: e.target.value }));
                    }}
                />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default Login;
