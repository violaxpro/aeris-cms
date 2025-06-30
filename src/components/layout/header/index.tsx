
'use client';
import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { BellOutlined } from '@ant-design/icons';
import Avatar from 'antd/es/avatar/Avatar';
import { Badge, Dropdown } from 'antd';
import AvatarImage from "public/social-avatar.webp"

export default function HeaderLayout() {
    return (
        <Header className='flex justify-end' style={{ background: '#fff', padding: 0 }}>
            <div className="flex items-center gap-4 mx-6">
                <Badge count={3}>
                    <BellOutlined />
                </Badge>
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
        </Header>
    );
}
