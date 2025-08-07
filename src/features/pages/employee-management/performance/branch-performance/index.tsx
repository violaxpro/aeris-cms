'use client'
import React, { useState } from 'react'
import { useNotificationAntd } from '@/components/toast'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import AvatarImage from "public/social-avatar.webp"
import { Dropdown, Menu } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import dynamic from 'next/dynamic'

const OrganizationalChart = dynamic(() => import('@/components/chart/OrganizationalChart'), {
    ssr: false,
});

const index = ({ data }: { data?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
    const [openModalForm, setOpenModalForm] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [formData, setFormData] = useState({
        employee_name: [],
        benefit_name: '',
        start_date: '',
        end_date: '',
        description: '',
        benefit_type: '',
        tags: []
    })
    const [modalType, setModalType] = useState('employee-benefit')
    const [formMode, setFormMode] = useState('create')
    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Organizational',
        },
    ]
    // Struktur data contoh

    const orgData = {
        data: {
            name: 'Dion Wiyoko',
            title: 'CEO',
            image: AvatarImage,
        },
        type: 'person',
        children: [
            {
                data: {
                    name: 'Andi Pratama',
                    title: 'Programmer Lead',
                    image: AvatarImage,
                },
                type: 'person',
                children: [
                    {
                        data: {
                            name: 'Rika Melati',
                            title: 'Front End Dev Lead',
                            image: AvatarImage,
                        },
                        type: 'person',
                        children: [
                            {
                                data: {
                                    name: 'Rika Melati',
                                    title: 'Front End Dev',
                                    image: AvatarImage,
                                },
                                type: 'person',
                                children: [
                                    {
                                        data: {
                                            name: 'Rika Melati',
                                            title: 'Front End Dev',
                                            image: AvatarImage,
                                        },
                                        type: 'person',
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        data: {
                            name: 'Fajar Nugraha',
                            title: 'Backend Dev Lead',
                            image: AvatarImage,
                        },
                        type: 'person',
                        children: [
                            {
                                data: {
                                    name: 'Rika Melati',
                                    title: 'Front End Dev',
                                    image: AvatarImage,
                                },
                                type: 'person',
                            },
                        ]
                    },
                ],
            },
            {
                data: {
                    name: 'Tia Ramadhani',
                    title: 'Marketing Lead',
                    image: AvatarImage,
                },
                type: 'person',
                children: [
                    {
                        data: {
                            name: 'Reza Maulana',
                            title: 'Marketing',
                            image: AvatarImage,
                        },
                        type: 'person',
                    },
                ],
            },
            {
                data: {
                    name: 'Dina Paramitha',
                    title: 'Product Lead',
                    image: AvatarImage,
                },
                type: 'person',
                children: [
                    {
                        data: {
                            name: 'Nanda Puspita',
                            title: 'UI/UX Designer Lead',
                            image: AvatarImage,
                        },
                        type: 'person',
                        children: [
                            {
                                data: {
                                    name: 'Rika Melati',
                                    title: 'Front End Dev',
                                    image: AvatarImage,
                                },
                                type: 'person',
                                children: [
                                    {
                                        data: {
                                            name: 'Rika Melati',
                                            title: 'Front End Dev',
                                            image: AvatarImage,
                                        },
                                        type: 'person',
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        data: {
                            name: 'Farhan Maulana',
                            title: 'Quality Assurance Lead',
                            image: AvatarImage,
                        },
                        type: 'person',
                        children: [
                            {
                                data: {
                                    name: 'Rika Melati',
                                    title: 'Front End Dev',
                                    image: AvatarImage,
                                },
                                type: 'person',
                            },
                        ]
                    },
                ],
            },
        ],
    };



    const handleChange = (field: string) => (
        e: any | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = typeof e === 'string' || Array.isArray(e)
            ? e
            : e.target.value;

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOpenModal = (type: string, mode: string) => {
        setOpenModalForm(true)
        setModalType(type)
        setFormMode(mode)
    }

    const mobileMenu = (
        <Menu>
            <Menu.Item key="filter" onClick={() => setisOpenModalFilter(true)}>
                Filter
            </Menu.Item>
            <Menu.Item key="export" >
                Export
            </Menu.Item>
            <Menu.Item key="showPageSize">
                <ShowPageSize pageSize={pageSize} onChange={setPageSize} />
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div style={{ padding: '1rem', textAlign: 'center' }}>
                <OrganizationalChart data={orgData} />
            </div>

        </>
    )
}

export default index
