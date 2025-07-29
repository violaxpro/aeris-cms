import React from 'react'

type EmployeeItemType = {
    className?: string
    label: string
    value: string
}
const EmployeeItem = ({
    className = 'flex-col',
    label,
    value
}: EmployeeItemType) => {
    return (
        <div className={`flex ${className}`}>
            <span className='text-[#787878]'>{label}</span>
            <span>{value}</span>
        </div>
    )
}

export default EmployeeItem
