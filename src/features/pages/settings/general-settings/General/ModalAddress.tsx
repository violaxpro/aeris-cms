import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import Table from '@/components/table'
import type { TableColumnsType } from 'antd'
import Popover from '@/components/popover'
import Link from 'next/link'
import Image from 'next/image';
import { routes } from '@/config/routes';
import { EditOutlined } from '@ant-design/icons';
import { addressData } from '@/plugins/types/settings-type';
import { TrashIconRed, PencilIconBlue } from '@public/icon';
import ButtonAction from '@/components/button/ButtonAction';
import DeleteConfirmModal from '@/components/modal/ModalDelete'
import Button from '@/components/button'

type ModalAddressProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        address: string
        city: string
        state: string
        postcode: string
        country: string
    }
}

const ModalAddress = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
}: ModalAddressProps) => {
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const handleDelete = (id: any) => {
        setOpenModalDelete(true)
    }

    const handleEdit = (id: any) => {

    }

    const handleSubmit = () => {
        setOpenModalEdit(false)
    }

    const columns: TableColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a: any, b: any) => {
                return a?.address?.localeCompare(b?.address)
            }
        },
        {
            title: 'City',
            dataIndex: 'city',
            sorter: (a: any, b: any) => {
                return a?.city?.localeCompare(b?.city)
            },
        },
        {
            title: 'State',
            dataIndex: 'state',
            sorter: (a: any, b: any) => {
                return a?.state?.localeCompare(b?.state)
            },
        },
        {
            title: 'Postcode',
            dataIndex: 'postcode',
            sorter: (a: any, b: any) => {
                return a?.postcode?.localeCompare(b?.postcode)
            },
        },
        {
            title: 'Country',
            dataIndex: 'country',
            sorter: (a: any, b: any) => {
                return a?.country?.localeCompare(b?.country)
            },
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <ButtonAction
                        color='primary'
                        variant='filled'
                        size="small"
                        icon={PencilIconBlue}
                        onClick={() => setOpenModalEdit(true)}
                    />
                    <ButtonAction
                        color='danger'
                        variant='filled'
                        size="small"
                        icon={TrashIconRed}
                        onClick={() => setOpenModalDelete(true)}
                    />
                </div >
            ),
        },
    ]


    return (
        <>
            <DeleteConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onDelete={handleDelete}
            />
            <Modal
                open={isModalOpen}
                title='Add Another Address'
                subtitle='Please complete all fields to create an another address'
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
            >
                <div className='grid md:grid-cols-2 gap-4 my-4'>
                    <div className='col-span-full'>
                        <Input
                            id='address'
                            label='Address'
                            type='text'
                            placeholder='Input Address'
                            onChange={handleChange}
                            value={formData.address}
                            divClassName='w-full'
                        />
                    </div>
                    <div className='col-span-full grid md:grid-cols-4 gap-2'>
                        <Input
                            id='city'
                            label='City'
                            type='text'
                            placeholder='City'
                            onChange={handleChange}
                            value={formData.city}
                        />
                        <Input
                            id='state'
                            label='State'
                            type='text'
                            placeholder='State'
                            onChange={handleChange}
                            value={formData.state}
                        />
                        <Input
                            id='postcode'
                            label='Post Code'
                            type='text'
                            placeholder='Input Post Code'
                            onChange={handleChange}
                            value={formData.postcode}
                        />
                        <Input
                            id='country'
                            label='Country'
                            type='text'
                            placeholder='Input Country'
                            onChange={handleChange}
                            value={formData.country}
                        />
                    </div>
                    <div className='col-span-full flex justify-center'>
                        {
                            !openModalEdit ? <Button
                                label='Submit'
                                onClick={() => console.log('hi')}
                                style={{ padding: '1.2rem 2rem' }}
                            /> : <Button
                                label='Edit'
                                onClick={() => setOpenModalEdit(false)}
                                style={{ padding: '1.2rem 2rem' }}
                            />
                        }

                    </div>
                    {
                        !openModalEdit && <div className='col-span-full'>
                            <label className='text-2xl font-semibold'>Address List</label>
                            <Table
                                columns={columns}
                                dataSource={addressData}
                            />
                        </div>
                    }


                </div>
            </Modal >
        </>

    )
}

export default ModalAddress
