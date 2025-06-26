import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;
type inputProps = {
    label: string
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    rows?: number
    maxLength?: number
    notes?: string
}

const index = ({
    label,
    placeholder,
    value,
    onChange,
    rows,
    maxLength,
    notes
}: inputProps) => {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <TextArea
                rows={rows}
                placeholder={placeholder}
                maxLength={maxLength}
                onChange={onChange}
                value={value}
            />
            {
                notes && (
                    <span className='text-gray-300'>{notes}</span>
                )
            }

        </>
    );
}

export default index;