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
    className?: string,
    disabled?: boolean
    divClassName?: string
    suffix?: React.ReactNode;
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
    errorMessage,
    className,
    disabled,
    divClassName,
    suffix
}: inputProps) => {

    return (
        <div className={divClassName}>
            <label htmlFor={id} className={`block text-sm font-medium text-gray-700 ${className}`}>
                {label}
            </label>
            <div>
                <Input
                    id={id}
                    disabled={disabled}
                    placeholder={placeholder ?? ''}
                    onChange={onChange}
                    value={value}
                    className='rounded-md text-sm w-full'
                    type={type}
                    style={{
                        ...style,
                        borderColor: error ? '#f5222d' : '#E5E7EB',
                    }}
                    readOnly={readOnly}
                    suffix={suffix}
                />
                {errorMessage && (
                    <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                )}
            </div>
            {
                notes && (
                    <span>{notes}</span>
                )
            }
        </div>
    );
};

export default index;
