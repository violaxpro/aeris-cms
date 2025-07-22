import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;
type inputProps = {
    id?: string
    label?: string
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    rows?: number
    maxLength?: number
    notes?: string,
    error?: string
    className?: string
    textareaClassname?: string
}

const index = ({
    id,
    label,
    placeholder,
    value,
    onChange,
    rows,
    maxLength,
    notes,
    error,
    className,
    textareaClassname
}: inputProps) => {
    return (
        <>
            <div className={className}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
                <div>
                    <TextArea
                        id={id}
                        rows={rows}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        onChange={onChange}
                        value={value}
                        className={textareaClassname}
                    />
                </div>
                {
                    notes && (
                        <span className='text-gray-300'>{notes}</span>
                    )
                }
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}

            </div>

        </>
    );
}

export default index;