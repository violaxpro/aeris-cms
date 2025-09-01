import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import Image from 'next/image';
import { CalendarGreyIcon } from '@public/icon';

const { RangePicker } = DatePicker;

type RangePickerInputProps = {
    id?: string
    label?: string
    value?: any
    labelClassName?: string
    onChange?: any
    placeholder?: any;
    disabled?: boolean;
    required?: boolean;
    showTime?: boolean
    format?: any
};

const DateRangePicker = ({
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
}: RangePickerInputProps) => (
    <div className="w-full">
        {
            label && (<label htmlFor={id} className="flex justify-between items-center text-sm font-medium text-gray-700">
                <div>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </div>
            </label>)
        }
        <RangePicker
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            style={{ width: '100%' }}
            className='h-10'
            showTime={showTime}
            format={format}
            suffixIcon={<Image
                src={CalendarGreyIcon}
                alt='calendar-icon'
                width={15}
                height={15}
            />}
        />
    </div>
);

export default DateRangePicker;