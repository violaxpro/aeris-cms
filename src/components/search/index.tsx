
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

        <form>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="search"
                    className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white
                    focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400
                    dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-inherit
                    dark:focus:ring-gray-300 dark:focus:border-gray-400"
                    placeholder="Search"
                    required
                />

                <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-[#0A3353] hover:bg-[#0A3353] focus:ring-4 focus:outline-none focus:ring-[#0A3353] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#0A3353] dark:hover:bg-[#0A3353] dark:focus:ring-[#0A3353]">Search</button>
            </div>
        </form>

    );
};

export default SearchInput;
