'use client'
import React, { useState, useEffect } from 'react';
import type { TableColumnsType } from 'antd'
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import Table from '@/components/table'
import { useNotificationAntd } from '@/components/toast';
import ItemList, { ItemListProps } from './ItemList';
import { getSupplier } from '@/services/supplier-list-service';
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import { Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import OrderSummary from '../../sales/OrderSummary';

const FormBilled: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionSupplier, setOptionSupplier] = useState([])
    const [showAddItem, setShowAddItem] = useState(false)
    const [date, setDate] = useState<any | null>(null);
    const [itemList, setItemList] = useState<any[]>([]);
    const [itemForm, setItemForm] = useState([{
        item: '',
        description: '',
        qty: 0,
        unit_price: 0,
        account: '',
        tax_rate: '',
        region: '',
        amount: 0
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        from: initialValues ? initialValues.from : '',
        reference: initialValues ? initialValues.reference : '',
        date: initialValues ? initialValues.date : '',
        dueDate: initialValues ? initialValues.due_date : '',
        subtotal: initialValues ? initialValues.subtotal : '',
        item: initialValues ? initialValues.item : [],
        discount: initialValues ? initialValues.discount : '',
        shipping_fee: initialValues ? initialValues.shipping_fee : '',
        gst: initialValues ? initialValues.gst : '',
        total: initialValues ? initialValues.total : '',
    });
    const [profitHidden, setProfitHidden] = useState(true)

    const breadcrumb = [
        { title: 'Supplier' },
        {
            title: 'Bill', url: routes.eCommerce.bill
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },
    ];

    const columns: TableColumnsType<ItemListProps> = [
        {
            title: 'Item',
            dataIndex: 'item',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'QTY',
            dataIndex: 'qty',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
        },
        {
            title: 'Account',
            dataIndex: 'account',
        },
        {
            title: 'Tax Rate',
            dataIndex: 'tax_rate',
        },
        {
            title: 'Region',
            dataIndex: 'region',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, row: any, index: number) => {
                return (
                    <div className='flex gap-2'>
                        <Button
                            label="Edit"
                            onClick={() => handleEditItem(index)}
                        />
                        <Button
                            label="Delete"
                            onClick={() => handleDeleteItem(index)}
                        />
                    </div>
                )
            }
        },

    ]

    const handleEditItem = (index: number) => {
        const itemToEdit = itemList[index];
        setItemForm(itemToEdit);
        setEditIndex(index);
        setShowAddItem(true);
    }

    const handleDeleteItem = (index: number) => {
        setItemList(prev => prev.filter((_, i) => i !== index));
    };

    // const handleAddProduct = () => {
    //     if (editIndex !== null) {
    //         const updatedList = [...itemList];
    //         updatedList[editIndex] = itemForm;
    //         setItemList(updatedList);
    //         setEditIndex(null);
    //     } else {
    //         setItemList([...itemList, itemForm]);

    //     }
    //     setItemForm({
    //         item: '',
    //         description: '',
    //         qty: 0,
    //         unit_price: 0,
    //         account: '',
    //         tax_rate: '',
    //         region: '',
    //         amount: 0
    //     });
    // };
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeSelect = (id: string, value: string | string[]) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleDateChange = (field: 'date' | 'dueDate', value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };


    const handleSubmit = async () => {
        try {
            const submitData = {
                from: formData.from,
                order_reference: formData.reference,
                item: itemList,
                date: formData.date,
                due_date: formData.dueDate,
                subtotal: Number(formData.subtotal),
                discount: Number(formData.discount),
                shipping_fee: Number(formData.shipping_fee),
                gst: Number(formData.gst),
                total: Number(formData.total)
            }

            // localStorage.setItem('products', JSON.stringify(submitData))
            // router.push(routes.eCommerce.order)
            // let response;
            // response = await updatePriceLevel(slug, submitData)

            // if (response.success == true) {
            //     notifySuccess(response.message)
            //     setTimeout(() => {
            //         router.push(routes.eCommerce.priceLevel)
            //     }, 2000);
            // }
        } catch (error) {
            console.error(error)
        }

    }

    const addItem = () => {
        setItemForm([
            ...itemForm,
            {
                item: '',
                description: '',
                qty: 0,
                unit_price: 0,
                account: '',
                tax_rate: '',
                region: '',
                amount: 0
            }
        ])
    }

    const handleRemoveRow = (index: number) => {
        const updated = [...itemForm];
        updated.splice(index, 1);
        setItemForm(updated);
    };

    const handleUpdateRow = (index: number, updatedForm: ItemListProps) => {
        const updated = [...itemForm];
        updated[index] = updatedForm;
        setItemForm(updated);
    };

    const options = [
        { label: 'WAITING', value: 'WAITING' },
        { label: 'RECEIVE', value: 'RECEIVE' }
    ]

    console.log(formData)

    useEffect(() => {
        const newSubtotal = itemList.reduce((acc, item) => acc + Number(item.amount || 0), 0);
        const discount = Number(formData.discount || 0)
        const shipping_fee = Number(formData.shipping_fee || 0)
        const tax = Number(formData.gst || 0)
        const total = newSubtotal - discount + shipping_fee + tax
        setFormData(prev => ({
            ...prev,
            subtotal: newSubtotal.toString(),
            total: total.toString()
        }));
    }, [itemList, formData.discount, formData.shipping_fee, formData.gst]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSupplier()

                const suppliers = res.data.map((sup: any) => ({
                    label: sup.name,
                    value: sup.id
                }))
                setOptionSupplier(suppliers)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()

    }, [])


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode == 'create' ? 'Create Bill' : 'Edit Bill'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='flex flex-col gap-2'>
                                <Input
                                    id='from'
                                    label='From'
                                    type='text'
                                    placeholder='Input From'
                                    onChange={handleChange}
                                    value={formData.from}
                                />
                                <DatePickerInput
                                    id='date'
                                    label='Date '
                                    value={formData.date ? dayjs(formData.date) : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('date', value, dateString)}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Input
                                    id='reference'
                                    label='Reference'
                                    type='text'
                                    placeholder='Input Reference'
                                    onChange={handleChange}
                                    value={formData.reference}
                                />
                                <DatePickerInput
                                    id='dueDate'
                                    label='Due Date '
                                    value={formData.dueDate ? dayjs(formData.dueDate) : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('dueDate', value, dateString)}
                                />
                            </div>
                        </div>

                        <div className='md:my-10'>
                            <h1 className='text-lg font-bold'>Item List</h1>
                            <Divider />
                            {
                                itemForm.map((item, index) => {
                                    return (
                                        <ItemList
                                            key={index}
                                            index={index}
                                            itemForm={item}
                                            onChange={(updateItem) => handleUpdateRow(index, updateItem)}
                                            onRemove={() => handleRemoveRow(index)}
                                            length={itemForm.length}
                                        />

                                    )
                                })
                            }
                            <Divider />
                            <div className='flex justify-end'>
                                <Button
                                    label='Add Item'
                                    icon={<PlusOutlined />}
                                    onClick={addItem}
                                />
                            </div>
                            {/* <Button
                                label='Add Item'
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788] mt-3"
                                onClick={() => setShowAddItem(!showAddItem)}
                            />
                            {
                                showAddItem &&
                                <ItemList
                                    itemForm={itemForm}
                                // setItemForm={setItemForm}
                                // onAddItem={handleAddProduct}
                                />
                            }
                            <div className='mt-2'>
                                <Table
                                    columns={columns}
                                    dataSource={itemList}
                                />
                            </div> */}
                        </div>

                        <div className='flex justify-end'>
                            <div className='md:w-[20%]'>
                                <OrderSummary
                                    profitHidden={profitHidden}
                                    onReveal={() => setProfitHidden(false)}
                                    profit={100}
                                    subtotal={1130.4}
                                    shippingFee={50}
                                    discount={5}
                                    gstRate={0.1}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode == 'create' ? 'Create Bill' : 'Edit Bill'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormBilled;
