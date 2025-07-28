
import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

type TimePickerInputProps = {
    id: string;
    label?: string;
    value: string; // format 'HH:mm'
    onChange: (value: string) => void;
    disabled?: boolean;
};

const format = 'HH:mm';

const TimePickerInput: React.FC<TimePickerInputProps> = ({
    id,
    label,
    value,
    onChange,
    disabled = false,
}) => {
    return (
        <div className='flex flex-col gap-1'>
            {label && (
                <label htmlFor={id} className='text-sm font-medium text-gray-700'>
                    {label}
                </label>
            )}
            <TimePicker
                id={id}
                format={format}
                value={value ? dayjs(value, format) : null}
                onChange={(time) => {
                    onChange(time ? time.format(format) : '');
                }}
                disabled={disabled}
                className='w-full'
            />
        </div>
    );
};

export default TimePickerInput;
