import L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';
L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';

export const icon = L.icon({
    iconSize: [40, 40],
    iconAnchor: [10, 41],
    popupAnchor: [8, -40],
    iconUrl: 'https://dbmgns9xjyk0b.cloudfront.net/partner-images/production/bestparking/bp-logo-mobile.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const iconHere = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const parkingSiteMarker = L.AwesomeMarkers.icon({
    icon: 'car',
    markerColor: 'blue',
    className: 'awesome-marker',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const locationMarker = L.AwesomeMarkers.icon({
    icon: 'circle',
    markerColor: 'red',
    className: 'awesome-marker',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});
