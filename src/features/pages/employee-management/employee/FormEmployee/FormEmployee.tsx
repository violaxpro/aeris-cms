'use client'
import React, { useState, useEffect } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation'
import { getTags } from '@/services/tags-service';
import Image from 'next/image';
import {
    ExportIcon,
    ChevronLeftBlackIcon,
    TelephoneGrayIcon,
    EmailGrayIcon,
    PinMapGrayIcon,
    PencilIcon
} from '@public/icon';
import ButtonIcon from '@/components/button/ButtonIcon';
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import { Divider } from 'antd';
import EmployeeItem from '@/components/card/DetailItem';
import { useRouter } from 'next/navigation';
import EditInformation from './EditInformation';
import DetailInformation from './DetailInformation';

const FormEmployee: React.FC<FormProps> = ({ mode, initialValues }) => {
    const router = useRouter()
    const { slug }: any = useParams()
    const [formData, setFormData] = useState({
        name: '',
    });

    // useEffect(() => {
    //     if (slug) {
    //         getTags(slug).then((res) =>{
    //             setFormData(res.data)
    //         }).catch((error) => console.log(error))
    //     }
    // }, [slug])

    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Employee',
        },
        { title: mode === 'edit' ? 'Edit' : 'Detail' },
    ]

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Employee
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <Button
                        icon={<Image
                            src={ExportIcon}
                            alt='export-icon'
                            width={15}
                            height={15}
                        />}
                        label='Export'
                    />
                </div>
            </div>

            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
                        <div className='flex flex-col gap-3 md:col-span-3'>
                            <div className='flex items-center gap-4'>
                                <ButtonIcon
                                    icon={ChevronLeftBlackIcon}
                                    shape='circle'
                                    onClick={() => router.push(routes.eCommerce.employee)}
                                    className='cursor-pointer'
                                />
                                <span className='text-lg font-semibold'>{mode == 'detail' ? 'Employee Details' : 'Edit Details'}</span>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] p-4'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col items-center gap-3'>
                                        <Avatar
                                            url={AvatarImage}
                                            className='!border !border-[#FFF36D] !p-1'
                                        />
                                        <div className='flex flex-col items-center'>
                                            <h4 className='text-lg font-semibold'>Marcella Indarwati</h4>
                                            <span className='text-md text-[#A19F9F]'>UI/UX Designer</span>
                                        </div>

                                        <div className='flex items-center gap-4'>
                                            <ButtonIcon
                                                size='large'
                                                icon={TelephoneGrayIcon}
                                                shape='circle'
                                                color='default'
                                                variant='filled'
                                                width={15}
                                            />
                                            <ButtonIcon
                                                size='large'
                                                icon={EmailGrayIcon}
                                                shape='circle'
                                                color='default'
                                                variant='filled'
                                                width={15}
                                            />
                                            <ButtonIcon
                                                size='large'
                                                icon={PinMapGrayIcon}
                                                shape='circle'
                                                color='default'
                                                variant='filled'
                                                width={15}
                                            />
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className='flex flex-col gap-3'>
                                        <EmployeeItem label='Hired Since' value='-' />
                                        <EmployeeItem label='Employee ID' value='2198087' />
                                        <label className='text-[#787878]'>Contact Information</label>
                                        <EmployeeItem label='Email' value='marcella29@gmail.com' />
                                        <EmployeeItem label='Phone Number' value='+62876 7654 0092' />
                                        <EmployeeItem label='Location' value='-' />
                                    </div>
                                    {
                                        mode == 'detail'
                                            ? <Button
                                                label='Edit Details'
                                                icon={<Image
                                                    src={PencilIcon}
                                                    alt='edit-icon'
                                                    width={15}
                                                    height={15}
                                                />}
                                            />
                                            : <Button
                                                label='Save Details'
                                                icon={<Image
                                                    src={ExportIcon}
                                                    alt='save-icon'
                                                    width={15}
                                                    height={15}
                                                />}
                                                btnClassname='!bg-[#18B356] !h-10'
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            mode == 'edit'
                                ? <EditInformation />
                                : <DetailInformation />
                        }

                    </div>

                </div>
            </Content>
        </>
    );
};

export default FormEmployee;
