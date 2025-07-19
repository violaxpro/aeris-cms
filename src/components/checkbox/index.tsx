'use client';

import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

type CheckboxInputProps = {
    id?: string
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    text: string
    className?: string
};

const CheckboxInput: React.FC<CheckboxInputProps> = ({
    id,
    label,
    checked,
    onChange,
    disabled = false,
    text,
    className
}) => {
    const handleChange: CheckboxProps['onChange'] = (e) => {
        onChange(e.target.checked);
    };

    return (
        <div className='flex flex-col'>
            {
                label && <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            }
            <Checkbox id={id} checked={checked} onChange={handleChange} disabled={disabled}>
                {text}
            </Checkbox>
        </div>

    );
};

export default CheckboxInput;
