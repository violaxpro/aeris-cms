import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';

type DatePickerInputProps = {
    id?: string
    label?: string
    value?: DatePickerProps['value'];
    labelClassName?: string
    onChange?: DatePickerProps['onChange'];
    placeholder?: string;
    disabled?: boolean;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
    id,
    label,
    value,
    labelClassName,
    onChange,
    placeholder = 'Select date',
    disabled = false,
}) => {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
                >
                    {label}
                </label>
            )}
            <DatePicker
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                style={{ width: '100%' }}
                className='h-10'
            />
        </div>
    );
};

export default DatePickerInput;
