import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks/auth';
function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const [user, setUser] = useState({ username: '', password: '', phone: '', name: '' });
    useEffect(() => {
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
        console.log(user);
        axios
            .post('http://127.0.0.1:5000/api/auth/signup', user)
            .then((response) => {
                console.log('Response:', response.headers);
                const jwt = response.data?.data.token;
                console.log(jwt);
                setCookie('jwt', jwt, 5);

                auth.login(jwt, response.data?.data.user);
                navigate(redirectPath, { replace: true });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Name</p>
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => {
                        setUser((prev) => ({ ...prev, name: e.target.value }));
                    }}
                />
            </label>
            <label>
                <p>Phone</p>
                <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => {
                        setUser((prev) => ({ ...prev, phone: e.target.value }));
                    }}
                />
            </label>
            <label>
                <p>Username</p>
                <input
                    type="text"
                    value={user.username}
                    onChange={(e) => {
                        setUser((prev) => ({ ...prev, username: e.target.value }));
                    }}
                />
            </label>
            <label>
                <p>Password</p>
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => {
                        setUser((prev) => ({ ...prev, password: e.target.value }));
                    }}
                />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default Signup;
