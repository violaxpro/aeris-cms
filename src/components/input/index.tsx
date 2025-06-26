import React, { useState } from 'react';
import { Input } from 'antd';

type inputProps = {
    label: string
    placeholder?: string
    id: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    notes?: string
    type: string
    style?: any
}

const index = ({ label, placeholder, id, value, onChange, notes, type, style }: inputProps) => {

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Input
                id={id}
                placeholder={placeholder ?? ''}
                onChange={onChange}
                value={value}
                className='rounded-md text-sm'
                type={type}
                style={{
                    ...style,
                    borderColor: '#E5E7EB',
                }}
            />
            {
                notes && (
                    <span>{notes}</span>
                )
            }
        </div>
    );
};

export default index;
