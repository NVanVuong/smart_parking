import L from 'leaflet';
export const path = {
    HOME: '/*',
    LOGIN: 'login',
    SIGNUP: 'signup',

    ADMIN: 'admin/*',
    ACCOUNTS: 'accounts',
    PARKINGSITES: 'parkingsites',
    TICKETS: 'tickets',
};

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
