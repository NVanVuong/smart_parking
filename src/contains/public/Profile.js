import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks/auth';
import { Header, Information, Reservation, ProfileBar, Password } from '~/components';
import { path } from '~/ultils/contains';

function Profile() {
    const auth = useAuth();
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex h-full w-full flex-col md:flex-row">
                <ProfileBar auth={auth} />
                <Routes>
                    <Route path="/" element={<Navigate to={path.INFORMATION} />} />
                    <Route path={path.USERNAME} element={<Information auth={auth} />} />
                    <Route path={path.PASSWORD} element={<Password auth={auth} />} />
                    <Route path={path.RESERVATION} element={<Reservation />} />
                </Routes>
            </div>
        </div>
    );
}

export default Profile;
