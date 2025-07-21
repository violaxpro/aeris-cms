'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HeaderIconSwitch, BodyIconSwitch } from '@public/icon';

interface CustomSwitchProps {
    initialState?: boolean;
    labelOn?: string; // Label ketika aktif (true)
    labelOff?: string; // Label ketika nonaktif (false)
    iconOn?: string; // Icon ketika aktif
    iconOff?: string; // Icon ketika nonaktif
    onToggle?: (state: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
    initialState = true,
    labelOn = 'Body',
    labelOff = 'Header',
    iconOn = BodyIconSwitch,
    iconOff = HeaderIconSwitch,
    onToggle,
}) => {
    const [enabled, setEnabled] = useState(initialState);

    const handleToggle = () => {
        const newState = !enabled;
        setEnabled(newState);
        onToggle?.(newState);
    };

    return (
        <button
            onClick={handleToggle}
            className={`relative inline-flex h-14 w-32 items-center rounded-full px-2 transition-colors duration-300
                ${enabled ? 'bg-[#103654]' : 'bg-[#3666AA]'}`}
        >
            {/* Label Aktif */}
            <span
                className={`absolute left-1/3 -translate-x-1/2 text-white text-sm font-medium transition-opacity duration-200
                    ${enabled ? 'opacity-100' : 'opacity-0'} uppercase`}
            >
                {labelOn}
            </span>

            {/* Label Nonaktif */}
            <span
                className={`absolute left-1/2 -translate-x-1/2 ml-5 text-white text-sm font-medium transition-opacity duration-200
                    ${!enabled ? 'opacity-100' : 'opacity-0'} uppercase`}
            >
                {labelOff}
            </span>

            {/* Bulatan */}
            <span
                className={`inline-block h-11 w-11 transform rounded-full bg-white shadow-md 
                    transition-transform duration-300 flex items-center justify-center
                    ${enabled ? 'translate-x-[4.3rem]' : ''}`}
            >
                <div className="flex justify-center items-center h-10 w-11">
                    <Image
                        src={enabled ? iconOn : iconOff}
                        alt="switch-icon"
                        width={30}
                        height={30}
                        className="block"
                    />
                </div>
            </span>
        </button>
    );
};

export default CustomSwitch;
