import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import React from 'react';

type Props = {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number, pageSize?: number) => void;
};

const Pagination: React.FC<Props> = ({ current, total, pageSize, onChange }) => {
    const totalPages = Math.ceil(total / pageSize);

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 3;

        for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            {totalPages > 1 && (
                <button
                    onClick={() => onChange(current - 1, pageSize)}
                    disabled={current <= 1}
                    className="w-9 h-9 rounded-md border bg-white text-gray-800 disabled:opacity-40"
                >
                    <DoubleLeftOutlined />
                </button>
            )}
            {generatePageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page, pageSize)}
                    className={`w-9 h-9 rounded-md border text-sm ${page === current
                        ? 'bg-[#0B2C4D] text-white'
                        : 'bg-white text-gray-800 hover:border-[#0B2C4D]'
                        }`}
                >
                    {page}
                </button>
            ))}

            {totalPages > 1 && (
                <>
                    {/* <span className="text-gray-500 px-1">...</span> */}
                    <button
                        onClick={() => onChange(current + 1, pageSize)}
                        disabled={current >= totalPages}
                        className="w-9 h-9 rounded-md border bg-white text-gray-800 disabled:opacity-40"
                    >
                        <DoubleRightOutlined />
                    </button>
                </>
            )}
        </div>
    );
};

export default Pagination;
