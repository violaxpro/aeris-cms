import React from 'react';
import { Select } from 'antd';

type Option = {
    value: string;
    label: string;
};

type SelectInputProps = {
    id: string;
    label: string;
    placeholder?: string;
    value: string | string[] | undefined;
    onChange: (value: string | string[]) => void;
    options: Option[];
    className?: string;
    modeType?: 'multiple' | 'tags' | undefined;
    allowClear?: boolean
};

const SelectInput: React.FC<SelectInputProps> = ({
    id,
    label,
    placeholder = '',
    value,
    onChange,
    options,
    className,
    modeType,
    allowClear = false
}) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Select
                id={id}
                showSearch
                style={{ width: '100%' }}
                placeholder={placeholder}
                allowClear={allowClear}
                optionFilterProp="label"
                value={value}
                onChange={onChange}
                options={options}
                filterSort={(a, b) =>
                    (a?.label ?? '').toLowerCase().localeCompare((b?.label ?? '').toLowerCase())
                }
                {...(modeType ? {
                    mode: modeType,

                } : {})}
            />
        </div>
    );
};

export default SelectInput;
