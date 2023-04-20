import { useEffect } from 'react';
import { Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import { locationMarker } from '../assets/icons/index';
function LocationMarker({ position, setPosition, center, setCenter, getParkingNearBy, distance, showRadius }) {
    useEffect(() => {
        map.locate();
        // eslint-disable-next-line
    }, []);

    const map = useMapEvents({
        locationfound(e) {
            setCenter(e.latlng);
            setPosition(e.latlng);
            map.setView(e.latlng, map.getZoom());
        },
        click(e) {
            setCenter(e.latlng);
            getParkingNearBy([e.latlng.lat, e.latlng.lng], distance);
            map.setView(e.latlng, map.getZoom());
        },
    });

    const circleOptions = { stroke: true, fill: true, color: '#2ab7df' };

    return (
        position && (
            <>
                {showRadius && <Circle center={center} radius={distance * 1000} pathOptions={circleOptions} />}
                <Marker position={center} icon={locationMarker}>
                    {center === position && <Popup>You are here</Popup>}
                </Marker>
            </>
        )
    );
}

export default LocationMarker;
