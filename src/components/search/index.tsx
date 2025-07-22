
import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

type SearchInputProps = {
    placeholder?: string;
    onSearch: (value: string) => void;
    width?: number | string;
    height?: number | string;
};

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = 'Search...',
    onSearch,
    width = 300,
}) => {
    return (
        <Search
            placeholder={placeholder}
            allowClear
            enterButton
            size="middle"
            onSearch={onSearch}
            style={{ width }}
        />
    );
};

export default SearchInput;
