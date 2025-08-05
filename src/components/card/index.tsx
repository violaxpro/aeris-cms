import React from 'react';
import Image from 'next/image';
interface CardProps {
    title: string;
    children: React.ReactNode;
    cols?: number; // default 2 or 3
    className?: string
    gridcols?: string
    icon?: string
    bgIcon?: string
    width?: number
}

export const Card: React.FC<CardProps> = ({ title, children, gridcols = 'grid-cols-2', className, icon, bgIcon = 'bg-[#00809D1A]', width = 15 }) => {
    return (
        <div className={`border p-4 rounded-xl ${className}`} style={{ borderColor: '#E5E7EB' }}>
            <div className='p-4'>
                <div className='flex items-center justify-between'>
                    <h4 className='text-lg font-semibold'>{title}</h4>
                    {
                        icon && <div className={`${bgIcon} p-2 rounded-md`}>
                            <Image
                                src={icon}
                                alt='icon'
                                width={width}
                                height={15}
                            />
                        </div>

                    }
                </div>
                <div className={`my-4 grid ${gridcols}  gap-4`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
