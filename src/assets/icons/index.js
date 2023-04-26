import L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';
L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';

export const parkingSiteMarker = L.AwesomeMarkers.icon({
    icon: 'car',
    markerColor: 'blue',
    className: 'awesome-marker',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const soldOutMarker = L.AwesomeMarkers.icon({
    icon: 'ban',
    markerColor: 'lightgray',
    className: 'awesome-marker',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const locationMarker = L.AwesomeMarkers.icon({
    icon: 'circle',
    markerColor: 'red',
    className: 'awesome-marker',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});
