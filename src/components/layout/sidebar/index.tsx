import React, { useState } from 'react'
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { menuItems } from './menu-items';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@public/logo/Alarm Expert Logo.webp';

const style: React.CSSProperties = {
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
}
const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const siderStyle: React.CSSProperties = {
        ...style,
        overflowY: 'hidden',
        height: '100vh',
        // borderRight: '1px solid #e5e7eb',
    };

    const scrollAreaStyle: React.CSSProperties = {
        ...style,
        overflowY: isHovered ? 'auto' : 'hidden',
        maxHeight: 'calc(100vh - 80px)',
        overflowX: 'hidden',
    };
    // const items = menuItems.map((item, index) => {
    //     return {
    //         key: item?.key ?? `item-${index}`,
    //         icon: item?.icon ? <item.icon /> : null,
    //         label: (
    //             item?.href ?
    //                 <Link href={item?.href} className="!text-inherit">
    //                     {item.label}
    //                 </Link> : <span>{item?.label}</span>
    //         ),
    //         children: item?.dropdownItems && item?.dropdownItems.map((itemChildren, indexChildren) => {
    //             return {
    //                 key: itemChildren.key,
    //                 label: (
    //                     <Link href={itemChildren.href} className="!text-inherit">
    //                         {itemChildren.label}
    //                     </Link>
    //                 ),
    //                 children: itemChildren?.dropdownItems && itemChildren?.dropdownItems.map((item, index) => {
    //                     return {
    //                         key: item.key,
    //                         label: (
    //                             <Link href={item.href}>
    //                                 {item.label}
    //                             </Link>
    //                         )
    //                     }
    //                 })
    //             };
    //         }),
    //     }
    // })
    const renderMenuItems = (items: any, isInsideDropdown = false) => {
        return items.map((item: any) => {
            if (item.type === 'group') {
                // Jika item adalah grup (label abu-abu)
                return {
                    key: item.key,
                    label: item.label,
                    type: 'group',
                    children: item.children ? renderMenuItems(item.children, false) : undefined,
                };
            } else if (item.children) {
                // Jika item memiliki sub-menu (dropdown)
                return {
                    key: item.key,
                    icon: isInsideDropdown ? (
                        <span className="bullet text-gray-400 group-hover:text-primary" style={{ color: ' #999' }}>•</span>
                    ) : item.icon ? (
                        <item.icon />
                    ) : null,
                    label: <span className=''>{item.label}</span>,
                    children: renderMenuItems(item.children, true), // Rekursif untuk sub-menu
                };
            } else {
                // Jika item adalah item tunggal (tanpa sub-menu)
                return {
                    key: item.key,
                    icon: isInsideDropdown ? (
                        <span className="bullet text-gray-400 group-hover:text-primary">•</span>
                    ) : item.icon ? (
                        <item.icon />
                    ) : null,
                    label: (
                        // Menggunakan Link dari react-router-dom jika ada href
                        item.href ?
                            <Link href={item.href} className={`!text-inherit`}>
                                {item.label}
                            </Link> :
                            item.label // Jika tidak ada href, tampilkan label saja
                    ),
                };
            }
        });
    };

    const items = renderMenuItems(menuItems);
    return (
        <Sider
            style={siderStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="sidebar !bg-background"
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
            <div className="logo-header">
                <Image
                    src={logoImg}
                    alt='logo'
                    width={240}
                    height={50}
                />
            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                style={{ ...scrollAreaStyle, width: 250 }}
                className="!bg-background"
            />
        </Sider>
    )
}

export default Sidebar
