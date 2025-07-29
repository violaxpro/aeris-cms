import React from 'react';
import { Select } from 'antd';

type Option = {
    label: string;
    value?: string;
    options?: Option[];
};


type SelectInputProps = {
    id: string;
    label?: string;
    placeholder?: string;
    value: string | string[] | undefined;
    onChange: (value: string | string[]) => void;
    options?: Option[];
    className?: string;
    modeType?: 'multiple' | 'tags' | undefined;
    allowClear?: boolean
    popupRender?: any
    error?: string
    selectClassName?: string
    required?: boolean
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
    allowClear = false,
    popupRender,
    error,
    selectClassName,
    required
}) => {
    return (
        <div className={className}>
            {
                label && (<label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>)
            }
            <div>
                <Select
                    id={id}
                    showSearch
                    style={{ width: '100%' }}
                    className={`!h-10 ${selectClassName}`}
                    placeholder={placeholder}
                    allowClear={allowClear}
                    optionFilterProp="label"
                    value={value}
                    onChange={onChange}
                    options={options}
                    // filterSort={(a, b) =>
                    //     (a?.label ?? '').toLowerCase().localeCompare((b?.label ?? '').toLowerCase())
                    // }
                    mode={modeType}
                    popupRender={popupRender}
                />
            </div>

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

export default SelectInput;
