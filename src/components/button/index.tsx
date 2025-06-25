import React from 'react'
import { Button } from 'antd'

type buttonProps = {
    btnClassname?: string
    icon?: any
    label: string
}
const index = ({ btnClassname, icon, label }: buttonProps) => {
    return (
        <Button className={btnClassname}>
            {icon ?? icon}
            <span>
                {label}
            </span>
        </Button>
    )
}

export default index
