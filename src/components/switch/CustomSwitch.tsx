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
    className?: string
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: any = {
    sm: {
        container: 'h-8 w-16',
        circle: 'h-6 w-6',
        icon: 18,
        label: 'text-xs',
        translate: 'translate-x-[2.1rem]',
        ml: 'ml-4'
    },
    md: {
        container: 'h-10 w-24',
        circle: 'h-8 w-8',
        icon: 20,
        label: 'text-xs',
        translate: 'translate-x-[3.5rem]',
        ml: 'ml-4'
    },
    lg: {
        container: 'h-12 w-28',
        circle: 'h-10 w-10',
        icon: 25,
        label: 'text-sm',
        translate: 'translate-x-[4rem]',
        ml: 'ml-5'
    },
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({
    initialState = false,
    labelOn = 'Body',
    labelOff = 'Header',
    iconOn = BodyIconSwitch,
    iconOff = HeaderIconSwitch,
    onToggle,
    className,
    size
}) => {
    const [enabled, setEnabled] = useState(initialState);

    const handleToggle = () => {
        const newState = !enabled;
        setEnabled(newState);
        onToggle?.(newState);
    };

    const {
        container,
        circle,
        icon,
        label,
        translate,
        ml
    } = sizeClasses[size || 'lg'];

    return (
        <button
            onClick={handleToggle}
            className={`relative inline-flex items-center rounded-full px-1 transition-colors duration-300
        ${container} ${enabled ? 'inset-shadow-xl inset-shadow-[#103654] bg-[#103654]' : 'inset-shadow-xl inset-shadow-[#3666AA] bg-[#3666AA]'} ${className}`}
        >
            {/* Label Aktif */}
            <span
                className={`absolute left-1/3 -translate-x-1/2 text-white ${label} font-medium transition-opacity duration-200
            ${enabled ? 'opacity-100' : 'opacity-0'} uppercase`}
            >
                {labelOn}
            </span>

            {/* Label Nonaktif */}
            <span
                className={`absolute left-1/2 -translate-x-1/2 ${ml} text-white ${label} font-medium transition-opacity duration-200
            ${!enabled ? 'opacity-100' : 'opacity-0'} uppercase`}
            >
                {labelOff}
            </span>

            {/* Bulatan */}
            <span
                className={`inline-block transform rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center
            ${circle} ${enabled ? translate : ''}`}
            >
                <div className={`flex justify-center items-center ${circle}`}>
                    <Image
                        src={enabled ? iconOn : iconOff}
                        alt="switch-icon"
                        width={icon}
                        height={icon}
                        className="block"
                    />
                </div>
            </span>
        </button>


    );
};

export default CustomSwitch;
