import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
    position: [number, number];
    address: string;
};

const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, 18);
    return null;
}

export default function Maps({ position, address }: Props) {
    if (!position || position[0] === 0) {
        return <div className="h-48 w-full flex items-center justify-center text-gray-500">Loading map...</div>;
    }

    useEffect(() => {
        const container = L.DomUtil.get('map');
        if (container != null) {
            (container as any)._leaflet_id = null;
        }
    }, []);

    return (
        <MapContainer
            id='map'
            center={position}
            zoom={18}
            scrollWheelZoom={true}
            className="h-48 w-full rounded shadow"
            dragging={true}
        >
            <ChangeView center={position} />
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
                <Popup>{address}</Popup>
            </Marker>
        </MapContainer>
    );
}
