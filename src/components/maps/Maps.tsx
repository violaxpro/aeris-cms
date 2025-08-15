'use client'
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const { MapContainer, TileLayer, Marker, Popup, useMap } = require("react-leaflet");

type Props = {
    position: [number, number];
    address: string;
};

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, 18);
    return null;
}

function MapsComponent({ position, address }: Props) {
    return (
        <MapContainer
            key={position.join(",")} // biar re-render kalau posisi berubah
            center={position}
            zoom={18}
            scrollWheelZoom
            className="h-48 w-full rounded shadow"
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

// Dynamic import supaya hanya dijalankan di client
export default dynamic(() => Promise.resolve(MapsComponent), {
    ssr: false,
});
