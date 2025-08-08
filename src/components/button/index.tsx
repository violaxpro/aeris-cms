'use client'
import React, { useState } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd';
import Link from 'next/link';

type buttonProps = {
    btnClassname?: string
    icon?: any
    label?: string
    link?: string
    type?: ButtonProps['type'];
    onClick?: () => void
    shape?: any
    style?: any
    position?: 'start' | 'end'
    labelEnd?: string
    disabled?: boolean
}
const index = ({
    btnClassname = '!w-auto !bg-[var(--default-color)] !text-white hover:!border-inherit',
    icon,
    label,
    link,
    type,
    onClick,
    shape,
    style,
    position = 'start',
    labelEnd,
    disabled = false
}: buttonProps) => {
    // hover:!bg-inherit hover:!text-inherit hover:!border-inherit
    const button = (
        <Button
            className={`!h-10 ${btnClassname}`}
            type={type}
            onClick={onClick}
            shape={shape}
            style={style}
            iconPosition={position}
            disabled={disabled}
        >
            <div className='flex gap-2'>
                {icon ?? icon}
                {label && <span className={`${labelEnd && 'text-[#3666AA] hover:text-[#3666AA]'}`}>
                    {label}
                </span>
                }
            </div>
            {
                labelEnd && <span className='text-[#3666AA] hover:text-[#3666AA]'>
                    {labelEnd}
                </span>
            }
        </Button>
    )
    return link ? (
        <Link href={link}>
            {button}
        </Link>
    ) : (button)
}

export default index
