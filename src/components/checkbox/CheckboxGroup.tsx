import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxOptionType } from 'antd/es/checkbox';

type CheckboxGroupProps = {
    options: CheckboxOptionType[];
    value?: any[];
    onChange?: (checkedValues: any[]) => void;
    disabled?: boolean;
    defaultValue?: any[];
    className?: string;
    label?: string;
    required?: boolean
    error?: string
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    options,
    value,
    onChange,
    disabled = false,
    defaultValue,
    className,
    label,
    required,
    error
}) => {
    return (
        <div className={className}>
            {
                label && (<label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>)
            }
            <div>
                <Checkbox.Group
                    options={options}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    className={className}
                />
            </div>

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>

    );
};

export default CheckboxGroup;
