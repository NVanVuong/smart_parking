import { useState } from 'react';
import userApi from '../api/userApi';
import Loading from './Loading';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

export default function Password({ auth }) {
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPassword((password) => ({
            ...password,
            [name]: value,
        }));
        setError(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (password.newPassword === password.currentPassword) {
            setError(true);
            setErrorMessage('New password cannot be the same as current password');
        } else {
            try {
                await userApi.changePassword(auth?.account?._id, password);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 4000);
            } catch (error) {
                setError(true);
                setErrorMessage(error.response?.data?.message ?? 'An error occurred');
                setTimeout(() => setError(false), 4000);
            }
        }

        setLoading(false);
    };

    return !loading ? (
        <div className="mx-auto mt-16 h-fit w-4/5 md:w-1/4">
            <h2 className="mb-4 text-center text-xl font-medium text-gray-500">Change Password</h2>
            {error && (
                <div
                    className="relative mb-4 flex items-center space-x-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                    role="alert"
                >
                    <HiOutlineXCircle className="text-lg" />
                    <span className="block text-sm sm:inline">{errorMessage}</span>
                </div>
            )}
            {success && (
                <div
                    className="relative mb-4 flex items-center space-x-2 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
                    role="alert"
                >
                    <HiOutlineCheckCircle className="text-lg" />
                    <span className="block text-sm sm:inline">Password changed successfully!</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8 mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
                <div className="relative mb-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-500" htmlFor="currentPassword">
                        Current Password
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-500 shadow focus:outline-none"
                        id="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={password.currentPassword}
                        onChange={handleChange}
                        required
                    />
                    {!showPassword ? (
                        <BsEyeSlashFill
                            onClick={() => setShowPassword(!showPassword)}
                            className={`${
                                password.currentPassword === '' && 'hidden'
                            } absolute bottom-[11px] right-3 cursor-pointer text-gray-500`}
                        />
                    ) : (
                        <BsEyeFill
                            onClick={() => setShowPassword(!showPassword)}
                            className={`${
                                password.currentPassword === '' && 'hidden'
                            } absolute bottom-[11px] right-3 cursor-pointer text-gray-500`}
                        />
                    )}
                </div>
                <div className="relative mb-6">
                    <label className="mb-2 block text-sm font-semibold text-gray-500" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-500 shadow focus:outline-none"
                        id="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={password.newPassword}
                        onChange={handleChange}
                        required
                    />
                    {!showPassword ? (
                        <BsEyeSlashFill
                            onClick={() => setShowPassword(!showPassword)}
                            className={`${
                                password.newPassword === '' && 'hidden'
                            } absolute bottom-[11px] right-3 cursor-pointer text-gray-500`}
                        />
                    ) : (
                        <BsEyeFill
                            onClick={() => setShowPassword(!showPassword)}
                            className={`${
                                password.newPassword === '' && 'hidden'
                            } absolute bottom-[11px] right-3 cursor-pointer text-gray-500`}
                        />
                    )}
                </div>
                <div className="flex items-center justify-end">
                    <button
                        className="focus:shadow-outline rounded bg-blue-main py-2 px-4 font-bold text-white hover:ring-4 hover:ring-blue-main-ring active:bg-blue-main-ring"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <Loading />
    );
}
