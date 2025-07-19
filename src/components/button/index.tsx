import React from 'react'
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
}
const index = ({ btnClassname, icon, label, link, type, onClick }: buttonProps) => {
    const button = (
        <Button
            className={`!text-white !bg-[var(--default-color)] hover:!bg-[var(--btn-hover-bg)] hover:!text-[#103654] hover:!border-[#103654] ${btnClassname}`}
            {...(type ? { type } : {})}
            {...(onClick ? { onClick } : {})}

        >
            {icon ?? icon}
            {label && <span>
                {label}
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
