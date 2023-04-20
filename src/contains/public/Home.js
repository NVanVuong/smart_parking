import { Header, MapContainer } from '~/components';

function Home() {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <MapContainer />
        </div>
    );
}

export default Home;
