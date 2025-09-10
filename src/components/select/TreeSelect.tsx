'use client';
import React from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

interface SelectTreeProps {
    treeData: TreeSelectProps['treeData'];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    allowClear?: boolean;
    style?: React.CSSProperties;
    label: string
    id: string
    required?: boolean
    error?: any
    multiple?: boolean
}

const index: React.FC<SelectTreeProps> = ({
    treeData,
    value,
    onChange,
    placeholder = 'Please select',
    allowClear = true,
    style,
    label,
    id,
    required,
    error,
    multiple
}) => {
    return (
        <div>
            {
                label && (<label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>)
            }
            <TreeSelect
                showSearch
                style={{ width: '100%', ...style }}
                value={value}
                placeholder={placeholder}
                allowClear={allowClear}
                treeDefaultExpandAll
                onChange={onChange}
                treeData={treeData}
                styles={{
                    popup: { root: { maxHeight: 400, overflow: 'auto' } },
                }}
                className='!h-10'
                multiple={multiple}
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

export default index;
