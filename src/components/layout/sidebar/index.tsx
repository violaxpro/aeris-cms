import React from 'react'
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';
import logoImg from '@public/logo/Alarm Expert Logo.webp';
import { menuItems } from './menu-items';
import Link from 'next/link';

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const Sidebar = () => {
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
    const renderMenuItems = (items: any) => {
        return items.map((item: any) => {
            if (item.type === 'group') {
                // Jika item adalah grup (label abu-abu)
                return {
                    key: item.key,
                    label: item.label,
                    type: 'group',
                    children: item.children ? renderMenuItems(item.children) : undefined,
                };
            } else if (item.children) {
                // Jika item memiliki sub-menu (dropdown)
                return {
                    key: item.key,
                    icon: item.icon ? <item.icon /> : null,
                    label: item.label,
                    children: renderMenuItems(item.children), // Rekursif untuk sub-menu
                };
            } else {
                // Jika item adalah item tunggal (tanpa sub-menu)
                return {
                    key: item.key,
                    icon: item.icon ? <item.icon /> : null,
                    label: (
                        // Menggunakan Link dari react-router-dom jika ada href
                        item.href ?
                            <Link href={item.href} className="!text-inherit">
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
