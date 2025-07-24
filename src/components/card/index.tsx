import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
    cols?: number; // default 2 or 3
    className?: string
    gridcols?: string
}

export const Card: React.FC<CardProps> = ({ title, children, gridcols = 'grid-cols-2', className }) => {
    return (
        <div className={`border p-4 rounded-xl ${className}`} style={{ borderColor: '#E5E7EB' }}>
            <div className='p-4'>
                <h4 className='text-lg font-semibold'>{title}</h4>
                <div className={`my-4 grid ${gridcols}  gap-4`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
