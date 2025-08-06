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
    required?: boolean;
    showTime?: boolean
    format?: any
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
    id,
    label,
    value,
    labelClassName,
    onChange,
    placeholder = 'Select date',
    disabled = false,
    required,
    showTime = false,
    format = 'DD-MM-YYYY'
}) => {
    return (
        <div className="w-full">
            {
                label && (<label htmlFor={id} className="flex justify-between items-center text-sm font-medium text-gray-700">
                    <div>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </div>
                </label>)
            }
            <DatePicker
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                style={{ width: '100%' }}
                className='h-10'
                showTime={showTime}
                format={format}
            />
        </div>
    );
};

export default DatePickerInput;
