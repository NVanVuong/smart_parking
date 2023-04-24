import { Route, Routes } from 'react-router-dom';
import { Header, MapContainer, Login, Signup } from '~/components';
import { path } from '~/ultils/contains';

function Home() {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <Routes>
                <Route path="/" element={<MapContainer />} />
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.SIGNUP} element={<Signup />} />
            </Routes>
        </div>
    );
}

export default Home;
