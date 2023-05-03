import { Route, Routes, Navigate } from 'react-router-dom';
import { SlideBar, Accounts, ParkingSites, ReservationAdmin } from '~/components';
import { path } from '~/ultils/contains';

function Admin() {
    return (
        <div className="flex flex-col md:flex-row">
            <SlideBar />
            <Routes>
                <Route path="/" element={<Navigate to={path.ACCOUNTS} />} />
                <Route path={path.ACCOUNTS} element={<Accounts />} />
                <Route path={path.PARKINGSITES} element={<ParkingSites />} />
                <Route path={path.RESERVATIONS} element={<ReservationAdmin />} />
            </Routes>
        </div>
    );
}

export default Admin;
