
'use client';
import React, { useState } from 'react';
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
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <Header className='flex justify-between items-center !bg-background' style={{ padding: 0 }}>
            <div className=" demo-logo-vertical my-2 ">
                <Image
                    src={logoImg}
                    alt='logo'
                    width={200}
                    height={50}
                />
            </div>

            <div className="flex justify-between items-center gap-4 mx-6">
                {/* <SearchInput
                    placeholder="Search..."
                    onSearch={(value) => console.log(value)}
                /> */}

                <Badge count={3}>
                    <BellOutlined style={{ color: 'var(--text-color)' }} />
                </Badge>
                <Button
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
                        <Avatar src={AvatarImage.src} size="small" />
                        <span>Viola</span>
                    </div>
                </Dropdown>
            </div>
            <SettingsDrawer open={open} onClose={onClose}>
                <p>content</p>
            </SettingsDrawer>
        </Header>
    );
}
