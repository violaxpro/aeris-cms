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
    text?: string
    className?: string
    required?: boolean;

};

const CheckboxInput: React.FC<CheckboxInputProps> = ({
    id,
    label,
    checked,
    onChange,
    disabled = false,
    text,
    className,
    required
}) => {
    const handleChange: CheckboxProps['onChange'] = (e) => {
        onChange(e.target.checked);
    };

    return (
        <div className='flex flex-col'>
            {
                label && <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </div>
                </label>
            }
            <Checkbox id={id} checked={checked} onChange={handleChange} disabled={disabled} className={className}>
                {text}
            </Checkbox>
        </div>

    );
};

export default CheckboxInput;
