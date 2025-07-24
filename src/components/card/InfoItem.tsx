import React from 'react';

interface InfoItemProps {
    label: string;
    value: React.ReactNode;
    textColor?: string; // optional style
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value, textColor }) => {
    return (
        <div className='flex flex-col'>
            <label className='text-gray-500'>{label}</label>
            <span style={{ color: textColor }}>{value}</span>
        </div>
    );
};
