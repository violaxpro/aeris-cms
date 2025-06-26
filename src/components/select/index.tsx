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
    // defaultValue: string[];
    onChange: (value: string) => void; // pakai string karena antd Select return-nya bukan event
    options: Option[];
    className?: string;
    modeType?: 'multiple' | 'tags' | undefined;
};

const SelectInput: React.FC<SelectInputProps> = ({
    id,
    label,
    placeholder = '',
    // defaultValue,
    onChange,
    options,
    className,
    modeType
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
                // defaultValue={defaultValue}
                optionFilterProp="label"
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
