import React from 'react'
import { Button } from 'antd'
import Link from 'next/link'
import { ButtonProps } from 'antd';

type buttonProps = {
    btnClassname?: string
    icon?: any
    label: string
    link?: string
    type?: ButtonProps['type'];
}
const index = ({ btnClassname, icon, label, link, type }: buttonProps) => {
    const button = (
        <Button className={btnClassname}  {...(type ? { type } : {})}>
            {icon ?? icon}
            <span>
                {label}
            </span>
        </Button>
    )
    return link ? (
        <Link href={link}>
            {button}
        </Link>
    ) : (button)
}

export default index
