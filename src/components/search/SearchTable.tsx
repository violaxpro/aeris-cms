'use client';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

type SearchTableProps = {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch?: () => void;
    heightClass?: string;
};

const SearchTable: React.FC<SearchTableProps> = ({
    placeholder = 'Search here',
    value,
    onChange,
    onSearch,
    heightClass = 'h-11'
}) => {
    return (
        <div className={`bg-gray-100 rounded-lg flex items-center px-4 w-full max-w-sm ${heightClass}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                value={value}
                onChange={onChange}
            />
            <button onClick={onSearch} className="text-gray-400 hover:text-gray-600">
                <SearchOutlined />
            </button>
        </div>
    );
};

export default SearchTable;
