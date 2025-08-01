import React from 'react'

type ValueItem = { label: string; number?: number }
type ValueType = string | ValueItem | ValueItem[]

type DetailItemProps = {
    className?: string
    label: string
    value: ValueType
}

const index = ({ label, value, className }: DetailItemProps) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-[#787878]">{label}</span>
            <div className="flex flex-col gap-1">
                {Array.isArray(value) ? (
                    value.map((item, idx) => (
                        <div key={idx} className="flex justify-between w-full">
                            <span>{item.label}</span>
                            {item.number !== undefined && <span>{item.number}</span>}
                        </div>
                    ))
                ) : typeof value === 'object' && value !== null ? (
                    <div className="flex justify-between w-full">
                        <span>{value.label}</span>
                        {value.number !== undefined && <span>{value.number}</span>}
                    </div>
                ) : (
                    <span>{value}</span>
                )}
            </div>
        </div>
    )
}



export default index
