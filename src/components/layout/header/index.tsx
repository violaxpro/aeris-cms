
'use client';
import React, { useState, useEffect } from 'react';
import { Header } from 'antd/es/layout/layout';
import { BellOutlined } from '@ant-design/icons';
import Avatar from 'antd/es/avatar/Avatar';
import { Badge, Dropdown } from 'antd';
import AvatarImage from "public/social-avatar.webp"
import Image from 'next/image';
import logoImg from '@public/logo/Alarm Expert Logo.webp';
import SearchInput from '@/components/search';
import SettingsDrawer from '@/components/drawer'
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

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
            <div className="flex items-center demo-logo-vertical my-2  gap-6">
                <Image
                    src={logoImg}
                    alt='logo'
                    width={240}
                    height={50}
                />
                <SearchInput
                    placeholder="Search..."
                    onSearch={(value) => console.log(value)}
                />
            </div>

            <div className="flex justify-between items-center gap-4 mx-6">

                <Button className='!bg-background'>
                    <Badge count={3}>
                        <BellOutlined style={{ color: 'var(--text-color)' }} />
                    </Badge>
                </Button>

                <Button
                    className='!bg-background'
                    type="text"
                    icon={<SettingOutlined style={{ fontSize: 20, color: 'var(--text-color)' }} />}
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
                        <Avatar style={{ backgroundColor: '#87d068' }} src={AvatarImage.src} />
                    </div>
                </Dropdown>
            </div>
            <SettingsDrawer open={open} onClose={onClose}>
                <p>content</p>
            </SettingsDrawer>
        </Header>
    );
}
