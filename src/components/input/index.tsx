import React, { useState } from 'react';
import { Input } from 'antd';

type inputProps = {
    label: string
    placeholder?: string
    id: string
    value: string | number | string[]
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    notes?: string
    type: string
    style?: any
    readOnly?: boolean;
    error?: boolean
    errorMessage?: string
}

const index = ({ label,
    placeholder,
    id,
    value,
    onChange,
    notes,
    type,
    style,
    readOnly = false,
    error,
    errorMessage
}: inputProps) => {

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
                    borderColor: error ? '#f5222d' : '#E5E7EB',
                }}
                readOnly={readOnly}
            />
            {
                notes && (
                    <span>{notes}</span>
                )
            }
            {errorMessage && (
                <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}

        </div>
    );
};

export default index;
