import React from 'react'
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';
import logoImg from '@public/logo/Alarm Expert Logo.webp';
import { menuItems } from './menu-items';
import Link from 'next/link';

const Sidebar = () => {
    const items = menuItems.map((item, index) => {
        return {
            key: item.key,
            icon: item.icon ? <item.icon /> : null,
            label: (
                item?.href ?
                    <Link href={item.href} className="!text-inherit">
                        {item.name}
                    </Link> : <span>{item.name}</span>
            ),
            children: item?.dropdownItems && item?.dropdownItems.map((itemChildren, indexChildren) => {
                return {
                    key: itemChildren.key,
                    label: (
                        <Link href={itemChildren.href} className="!text-inherit">
                            {itemChildren.name}
                        </Link>
                    ),
                    children: itemChildren?.dropdownItems && itemChildren?.dropdownItems.map((item, index) => {
                        return {
                            key: item.key,
                            label: (
                                <Link href={item.href}>
                                    {item.name}
                                </Link>
                            )
                        }
                    })
                };
            }),
        }
    })

    return (
        <Sider
            className='!bg-white'
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
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
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} style={{ width: 250 }} />
        </Sider>
    )
}

export default Sidebar
