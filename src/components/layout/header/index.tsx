
'use client';
import React, { useState, useEffect } from 'react';
import { Header } from 'antd/es/layout/layout';
import Avatar from '@/components/avatar'
import { Badge, Dropdown, Menu } from 'antd';
import AvatarImage from "public/social-avatar.webp"
import Image from 'next/image';
// import logoImg from '@public/logo/Alarm Expert Logo.webp';
import SearchInput from '@/components/search';
import SettingsDrawer from '@/components/drawer'
import { Button } from 'antd';
import {
    BellBlackIcon,
    GearBlackIcon,
    HeadphoneIcon,
    BellOutlinedIcon,
    GearOutlinedIcon,
    LogoutIcon,
    UserIcon,
    HamburgerIcon
} from '@public/icon';
import { MoreOutlined } from '@ant-design/icons';
// import { useWindowWidth } from '@react-hook/window-size';

export default function HeaderLayout() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // const onlyWidth = useWindowWidth();

    const mobileMenu = (
        <Menu
            items={[
                {
                    key: 'support',
                    label: <Button type="text" icon={<Image src={HeadphoneIcon} alt="support-icon" width={15} />}>Support</Button>
                },
                {
                    key: 'notification',
                    label: <Button type="text" icon={<Image src={BellOutlinedIcon} alt="bell-icon" width={15} />}>Notifications</Button>
                },
                {
                    key: 'settings',
                    label: <Button type="text" icon={<Image src={GearOutlinedIcon} alt="gear-icon" width={15} />} onClick={showDrawer}>Settings</Button>
                },
                {
                    key: 'profile',
                    label: <Button type="text" icon={<Image src={UserIcon} alt="gear-icon" width={15} />}>Profile</Button>
                },
                {
                    key: 'logout',
                    label: <Button type="text" icon={<Image src={LogoutIcon} alt="gear-icon" width={15} />}>Logout</Button>
                },
            ]}
        />
    );
    return (
        <Header className={`
            flex justify-between items-center
            sticky top-0 z-50
            !bg-background
            transition-shadow duration-300
            ${isScrolled ? 'shadow-md' : ''}
        `}
            style={{ padding: '2.2rem 0' }}
        >
            <div className="flex items-center demo-logo-vertical my-2 gap-6 ml-2">
                <SearchInput
                    placeholder="Search..."
                    onSearch={(value) => console.log(value)}
                />
            </div>

            <div className="md:flex justify-between items-center gap-4 mx-6 hidden">
                <Button className='!border-none !shadow-none'>
                    <Image
                        src={HeadphoneIcon}
                        alt='support-icon'
                    />
                    <span className='font-semibold'>Need Support?</span>
                </Button>
                <Button className='rounded-lg !h-10 !shadow-md !border-none'>
                    <Badge count={3}>
                        <Image
                            src={BellBlackIcon}
                            alt='bell-icon'
                        />
                    </Badge>
                </Button>
                <Button
                    className='rounded-lg !h-10 !w-10 !shadow-md !border-none'
                    icon={
                        <Image
                            src={GearBlackIcon}
                            alt='gear-icon'
                        />
                    }
                    onClick={showDrawer}
                />

                <Dropdown
                    menu={{
                        items: [
                            { key: 'profile', label: 'Profile' },
                            { key: 'logout', label: 'Logout' },
                        ],
                    }}
                >
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar style={{ backgroundColor: '#87d068' }} url={AvatarImage} size='default' />
                    </div>
                </Dropdown>
            </div>

            <div className="md:hidden pr-4">
                <Dropdown overlay={mobileMenu} placement="bottomRight" trigger={['click']}>
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            </div>
            <SettingsDrawer open={open} onClose={onClose} />
        </Header>
    );
}
