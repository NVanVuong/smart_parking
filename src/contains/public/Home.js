import React from 'react';
import { Header, SearchUser, MapContainer } from '~/components';

function Home() {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <SearchUser />
            <MapContainer />
        </div>
    );
}

export default Home;
