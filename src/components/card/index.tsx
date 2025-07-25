import React from 'react';
import Image from 'next/image';
interface CardProps {
    title: string;
    children: React.ReactNode;
    cols?: number; // default 2 or 3
    className?: string
    gridcols?: string
    icon?: string
}

export const Card: React.FC<CardProps> = ({ title, children, gridcols = 'grid-cols-2', className, icon }) => {
    return (
        <div className={`border p-4 rounded-xl ${className}`} style={{ borderColor: '#E5E7EB' }}>
            <div className='p-4'>
                <div className='flex items-center justify-between'>
                    <h4 className='text-lg font-semibold'>{title}</h4>
                    {
                        icon && <div className='bg-[#00809D1A] p-2 rounded-md'>
                            <Image
                                src={icon}
                                alt='icon'
                                width={15}
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
