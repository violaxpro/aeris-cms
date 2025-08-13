"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { CameraIcon } from "@public/icon";
import Button from '@/components/button'

interface CameraInputProps {
    label?: string;
    onChange: (file: File | null) => void;
    preview?: string | null
}

const CameraInput: React.FC<CameraInputProps> = ({ label = "Photo", onChange, preview }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const webcamRef = useRef<Webcam | null>(null);

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cameraError, setCameraError] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
        setIsCameraOpen(false);
    };

    const requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (stream) {
                setIsCameraOpen(true);
                setCameraError("");
            }
        } catch (err) {
            console.error("Camera access denied", err);
            setCameraError("Camera access denied. Please allow permission or choose a file.");
            fileInputRef.current?.click();
        }
    };

    const capturePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                fetch(imageSrc)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
                        onChange(file);
                        setIsCameraOpen(false);
                    });
            }
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">{label}</label>
            {!isCameraOpen ? (
                <div
                    onClick={requestCameraPermission}
                    className="flex items-center justify-center gap-2 border border-dashed border-[#A19F9F] rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Preview"
                            width={0}
                            height={0}
                            className="w-full h-auto"
                        />
                    ) : (
                        <>
                            <Image src={CameraIcon} alt="camera-icon" />
                            <span className="text-[#A19F9F]">
                                Take a photo now <span className="text-[#4096ff]">or choose from file</span>
                            </span>
                        </>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className="w-full rounded-md"
                    />
                    <div className="flex justify-center gap-2">
                        <Button
                            label="Capture"
                            onClick={capturePhoto}
                        />
                        <Button
                            label="Cancel"
                            onClick={() => setIsCameraOpen(false)}
                            btnClassname='!w-auto !text-black hover:!border-inherit !hover:!bg-white !bg-white'
                        />
                    </div>
                </div>
            )}

            {cameraError && (
                <p className="text-red-500 text-xs mt-1">{cameraError}</p>
            )}
        </div>
    );
};

export default CameraInput;
