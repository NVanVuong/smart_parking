import { Route, Routes, Navigate } from 'react-router-dom';
import { SlideBar, Accounts, ParkingSites, Tickets } from '~/components';
import { path } from '~/ultils/contains';

function Admin() {
    return (
        <div className="flex">
            <SlideBar></SlideBar>
            <Routes>
                <Route path="/" element={<Navigate to={path.ACCOUNTS} />} />
                <Route path={path.ACCOUNTS} element={<Accounts />} />
                <Route path={path.PARKINGSITES} element={<ParkingSites />} />
                <Route path={path.TICKETS} element={<Tickets />} />
            </Routes>
        </div>
    );
}

export default Admin;
