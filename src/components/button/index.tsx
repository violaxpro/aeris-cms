import React from 'react'
import { Button } from 'antd'
import Link from 'next/link'

type buttonProps = {
    btnClassname?: string
    icon?: any
    label: string
    link?: string
}
const index = ({ btnClassname, icon, label, link }: buttonProps) => {
    const button = (
        <Button className={btnClassname}>
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
