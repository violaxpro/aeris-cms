
'use client';
import React, { useState, useEffect } from 'react';
import { Header } from 'antd/es/layout/layout';
import Avatar from '@/components/avatar'
import { Badge, Dropdown, Menu, Grid, Drawer } from 'antd';
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
import TimerBox from '@/components/timer';
import ModalCheckIn from './ModalCheckIn';
import ModalStartBreakCheckout from './ModalStartBreakCheckout';
import ModalFinishBreak from './ModalFinishBreak';
import dayjs from 'dayjs';
import { getAttendanceStatus } from '@/plugins/utils/attendance';

const { useBreakpoint } = Grid;

export default function HeaderLayout({ onOpenDrawer }: { onOpenDrawer?: () => void }) {
    const [second, setSecond] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModalWorking, setOpenModalWorking] = useState(false)
    const [attendanceType, setAttendanceType] = useState('')
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const [formData, setFormData] = useState({
        // Check In
        check_in_photo: [],
        check_in_description: '',
        check_in_location: '',
        check_in_device: '',

        // Start / Finish Break
        is_start_break: false,
        is_finish_break: false,
        finish_break_description: '',

        // Checkout
        is_checkout: false,
        check_out_photo: [],
        check_out_detected_overtime: '',
        check_out_is_claim_overtime: '',
        check_out_reason: '',
        check_out_location: '',
    });

    const status = getAttendanceStatus(formData)
    console.log(status)
    const handleChange = (field: string) => (
        e: any
    ) => {
        let value
        if (dayjs.isDayjs(e) || e === null) {
            value = e ? e.format('DD-MM-YYYY') : '';
        }
        // Jika event input biasa
        else if (e && typeof e === 'object' && 'target' in e) {
            value = e.target.value;
        }
        // Jika string langsung dari Select
        else {
            value = e;
        }
        setFormData((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

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

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isRunning) {
            interval = setInterval(() => {
                setSecond(prev => prev + 1)
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }

    }, [isRunning])

    const handleRunning = () => {
        const status = getAttendanceStatus(formData)
        console.log(status)
        if (['can_check_in', 'can_start_break', 'can_finish_break', 'can_checkout'].includes(status)) {
            setAttendanceType(status);
            setOpenModalWorking(true);
            return;
        }

        // 2️⃣ Jika sudah di fase kerja / break, tombol play/pause toggle timer
        setIsRunning(prev => !prev);
        // switch (status) {
        //     case 'can_check_in':
        //         setOpenModalWorking(true)
        //         setAttendanceType(type)
        //         break;

        //     default:
        //         break;
        // }
        // setIsRunning(prev => !prev)
    }

    const handleSubmit = () => {
        switch (attendanceType) {
            case 'can_check_in':
                setFormData((prev: any) => ({ ...prev, check_in_photo: ['dummy_photo'] }));
                setIsRunning(true);
                break;
            case 'can_start_break':
                setFormData(prev => ({ ...prev, is_start_break: true }));
                setIsRunning(true); // mulai timer break
                break;

            case 'can_finish_break':
                setFormData(prev => ({ ...prev, is_finish_break: true }));
                setIsRunning(false); // berhenti timer break
                break;

            case 'can_checkout':
                setFormData(prev => ({ ...prev, is_checkout: true }));
                setIsRunning(false); // berhenti timer kerja
                break;
            case 'off_day':
                alert('Today id off day!');
                break;
            default:
                alert('Working...');
                break;
        }
        setOpenModalWorking(false);
        setAttendanceType('');
    }
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
    console.log(attendanceType)
    return (
        <>
            {
                attendanceType == 'can_check_in'
                && <ModalCheckIn
                    isModalOpen={openModalWorking}
                    formData={formData}
                    handleChange={handleChange}
                    handleCancel={() => setOpenModalWorking(false)}
                    handleSubmit={handleSubmit}
                />
            }
            {
                attendanceType == 'can_start_break' || attendanceType == 'can_checkout'
                && <ModalStartBreakCheckout
                    isModalOpen={openModalWorking}
                    formData={formData}
                    handleChange={handleChange}
                    handleCancel={() => setOpenModalWorking(false)}
                    handleSubmit={handleSubmit}
                />
            }

            {
                attendanceType == 'can_finish_break' &&
                <ModalFinishBreak
                    isModalOpen={openModalWorking}
                    formData={formData}
                    handleChange={handleChange}
                    handleCancel={() => setOpenModalWorking(false)}
                    handleSubmit={handleSubmit}
                />
            }

            <Header className={`
            flex justify-between items-center
            sticky top-0 z-50
            !bg-background
            transition-shadow duration-300
            ${isScrolled ? 'shadow-md' : ''}
        `}
                style={{ padding: '2.2rem 0' }}
            >
                {/* {
                isMobile &&
                <div className="p-4 bg-white flex items-center justify-between sticky top-0 z-100">
                    <Image
                        src={HamburgerIcon}
                        alt='hamburger-icon'
                        onClick={onOpenDrawer}
                    />
                    <Image src={logoImg} alt="logo" width={120} height={40} />
                </div>
            } */}
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
                    <TimerBox
                        isRunning={isRunning}
                        onPlay={handleRunning}
                        seconds={second}
                    />
                    <Button className='rounded-lg !h-10 !shadow-sm !border-gray-200'>
                        <Badge count={3}>
                            <Image
                                src={BellBlackIcon}
                                alt='bell-icon'
                            />
                        </Badge>
                    </Button>
                    <Button
                        className='rounded-lg !h-10 !w-12 !shadow-sm !border-gray-200'
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
        </>
    );
}
