'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/components/input'
import { SettingOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { CurrentLocationIcon } from '@public/icon';

// Import map secara dinamis
const MapComponent = dynamic(() => import('./Maps'), { ssr: false });

export default function LocationInput() {
    const [address, setAddress] = useState('Loading location...');
    const [position, setPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    setPosition([lat, lng]);

                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                        );
                        const data = await res.json();
                        setAddress(data.display_name); // alamat lengkap
                    } catch (error) {
                        console.error("Gagal ambil alamat:", error);
                    }
                },
                (err) => {
                    console.error('Gagal ambil lokasi:', err);
                },
                { enableHighAccuracy: true }
            );
        }
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <Input
                id='location'
                label='Location'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                suffix={<Image
                    src={CurrentLocationIcon}
                    alt='current-location'
                    width={15}
                    height={15}
                />}
                placeholder="Enter location"
                type='text'
            />
            {/* <Button
                onClick={() => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => {
                                setPosition([pos.coords.latitude, pos.coords.longitude]);
                            },
                            (err) => {
                                console.error('Gagal ambil lokasi:', err);
                            },
                            { enableHighAccuracy: true }
                        );
                    }
                }}
            >
                Ambil Lokasi Terkini
            </Button> */}
            {/* Map */}
            <MapComponent position={position} address={address} />
        </div>
    );
}
