import React, { useState } from 'react';
import { Input } from 'antd';

type inputProps = {
    label?: string
    placeholder?: string
    id: string
    value: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    notes?: any
    type: string
    style?: any
    readOnly?: boolean;
    error?: boolean
    errorMessage?: string
    className?: string,
    inputClassname?: string,
    disabled?: boolean
    divClassName?: string
    labelClassName?: string
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    required?: boolean;
    segmented?: any
    onClick?: any
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
    labelClassName = 'w-full',
    prefix,
    suffix,
    required,
    segmented,
    onClick,
    inputClassname
}: inputProps) => {
    return (
        <div className={divClassName}>
            {
                label && (
                    <label htmlFor={id} className={`mb-1 flex justify-between items-center text-sm font-medium text-gray-700 ${labelClassName}`}>
                        <div>
                            {label}
                            {required && <span className="text-red-500 ml-1">*</span>}
                        </div>
                        {
                            segmented && segmented
                        }

                    </label>)
            }
            <div className={inputClassname}>
                <Input
                    id={id}
                    disabled={disabled}
                    placeholder={placeholder ?? ''}
                    onChange={onChange}
                    value={value}
                    className='rounded-md text-sm w-full h-10'
                    type={type}
                    style={{
                        ...style,
                        // borderColor: error ? '#f5222d' : '#E5E7EB',
                    }}
                    readOnly={readOnly}
                    suffix={suffix}
                    prefix={prefix}
                    onClick={onClick}
                />
                {errorMessage && (
                    <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                )}
            </div>
            {notes && <div className='text-xs mt-1'>{notes}</div>}
        </div>
    );
};

export default index;
