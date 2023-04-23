import { Header, MapContainer } from '~/components';
import { ToastContainer } from 'react-toastify';

function Home() {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <MapContainer />
            <ToastContainer />
        </div>
    );
}

export default Home;
