import React from 'react'
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';
import logoImg from '@public/logo/Alarm Expert Logo.webp';
import { menuItems } from '@/layouts/hydrogen/menu-items';
import Link from 'next/link';

const Sidebar = () => {
    const items = menuItems.map((item, index) => {
        return {
            key: String(index + 1),
            icon: item.icon,
            label: (
                item?.href ?
                    <Link href={item.href}>
                        {item.name}
                    </Link> : <span>{item.name}</span>
            ),
            children: item?.dropdownItems && item?.dropdownItems.map((itemChildren, indexChildren) => {
                const subKey = index * 4 + indexChildren + 1;
                return {
                    key: subKey,
                    label: (
                        <Link href={itemChildren.href}>
                            {itemChildren.name}
                        </Link>
                    ),
                };
            }),
        }
    })

    return (
        <Sider
            className='bg-white'
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="demo-logo-vertical my-2 ">
                <Image
                    src={logoImg}
                    alt='logo'
                    width={200}
                    height={50}
                />
            </div>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Sider>
    )
}

export default Sidebar
