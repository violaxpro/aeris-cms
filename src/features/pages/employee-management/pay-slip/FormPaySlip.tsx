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
// import ProductInput, { ProductForm } from '../ProductInput';
import { PlusOutlined, PercentageOutlined } from '@ant-design/icons';
import { DollarIcon } from '@public/icon';
import Divider from '@/components/divider'
import Segmented from '@/components/segmented'
// import OrderSummary from '../OrderSummary';
import Image from 'next/image';
import ButtonCancel from '@/components/button/ButtonAction'
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import { employeeData } from '@/plugins/types/employee-management-type';
// import ModalAddress from './ModalAddress';
// import ModalCustomer from './ModalCustomer';

const FormPaySlip: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState([{
        sku: '',
        name: '',
        price: 0,
        buying_price: 0,
        trade: 0,
        silver: 0,
        gold: 0,
        platinum: 0,
        diamond: 0,
        qty: 0,
        tax_rate: '',
        tax_amount: 0,
        total: 0,
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        employee_name: initialValues ? initialValues.employee_name : '',
        employee_id: initialValues ? initialValues.employee_id : '',
        role: initialValues ? initialValues.role : '',
        email: initialValues ? initialValues.email : '',
        phone: initialValues ? initialValues.phone : '',
        address: initialValues ? initialValues.address : '',
        start_date: initialValues ? initialValues.start_date : '',
        end_date: initialValues ? initialValues.end_date : '',
        payment_method: initialValues ? initialValues.payment_method : '',
        basic_salary: initialValues ? initialValues.basic_salary : '',
        overtime: initialValues ? initialValues.overtime : '',
        kpi: initialValues ? initialValues.kpi : '',
        reimbursement: initialValues ? initialValues.reimbursement : '',
        bonus: initialValues ? initialValues.bonus : '',
        late_fee: initialValues ? initialValues.late_fee : '',
        bpjs_kesehatan: initialValues ? initialValues.bpjs_kesehatan : '',
        bpjs_ketenagakerjaan: initialValues ? initialValues.bpjs_ketenagakerjaan : '',
        pph21: initialValues ? initialValues.pph21 : '',
        debt: initialValues ? initialValues.debt : '',
        total_income: 0,
        total_deduction: 0,
        total_received: 0
    });
    const [formErrors, setFormErrors] = useState({
        user: '',
        billing_address: '',
        shipping_address: '',
        subtotal: '',
        product: '',
        shipping_fee: '',
        gst: '',
        total: '',
    });
    const [selectedDiscountType, setSelectedDiscountType] = useState('percent')
    const [profitHidden, setProfitHidden] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState<'billing' | 'shipping' | null>(null);
    const [buttonType, setButtonType] = useState<'oneof' | 'new' | null>(null);
    const [formAddress, setFormAddress] = useState({
        address: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
    })
    const [formCustomer, setFormCustomer] = useState({
        name: '',
    })
    const [openModalCustomer, setOpenModalCustomer] = useState(false)

    const breadcrumb = [
        { title: 'Employee Management' },
        {
            title: 'Pay Slip', url: routes.eCommerce.paySlip
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },
    ];

    const optionsTax = [
        { label: 'Tax Exclusive', value: 'tax-exclusive' },
        { label: 'Tax Inclusive', value: 'tax-inclusive' },
        { label: 'No Tax', value: 'no-tax' }
    ]

    const handleEditProduct = (index: number) => {
        const productToEdit = productList[index];
        setProductForm(productToEdit);
        setEditIndex(index);
        setShowAddProduct(true);
    }
    const handleDeleteProduct = (index: number) => {
        setProductList(prev => prev.filter((_, i) => i !== index));
    };

    // const handleAddProduct = () => {
    //     if (editIndex !== null) {
    //         const updatedList = [...productList];
    //         updatedList[editIndex] = productForm;
    //         setProductList(updatedList);
    //         setEditIndex(null);
    //     } else {
    //         setProductList([...productList, productForm]);

    //     }
    //     setProductForm({
    //         sku: '',
    //         name: '',
    //         price: 0,
    //         buying_price: 0,
    //         qty: 0,
    //         // tax: '',
    //         total: 0,
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

    const handleSubmit = async () => {
        const newErrors = {
            user: '',
            billing_address: '',
            shipping_address: '',
            subtotal: '',
            product: '',
            shipping_fee: '',
            gst: '',
            total: '',
        };

        // if (!formData.user.trim()) newErrors.user = 'User is required';
        // if (!formData.billing_address.trim()) newErrors.billing_address = 'Billing Address is required';
        // if (!formData.shipping_address.trim()) newErrors.shipping_address = 'Shipping Address is required';

        // if (!formData.subtotal || Number(formData.subtotal) <= 0) newErrors.subtotal = 'Subtotal must be greater than 0';
        // if (productList.length === 0) newErrors.product = 'At least one product is required';
        // if (!formData.shipping_fee || Number(formData.shipping_fee) <= 0) newErrors.shipping_fee = 'Shipping Fee is required';
        // if (!formData.gst || Number(formData.gst) <= 0) newErrors.gst = 'GST/Tax is required';
        // if (!formData.total || Number(formData.total) <= 0) newErrors.total = 'Total must be greater than 0';

        const hasErrors = Object.values(newErrors).some((v) => v !== '');

        if (hasErrors) {
            setFormErrors(newErrors);
            return;
        } else {
            setFormErrors({
                user: '',
                billing_address: '',
                shipping_address: '',
                subtotal: '',
                product: '',
                shipping_fee: '',
                gst: '',
                total: '',
            });
        }
        try {
            const submitData = {
                // user: formData.user,
                // po_number: formData.po_number,
                // billing_address: formData.billing_address,
                // shipping_address: formData.shipping_address,
                // order_reference: formData.order_reference,
                // product: productList,
                // delivery_note: formData.delivery_note,
                // internal_note: formData.internal_note,
                // subtotal: Number(formData.subtotal),
                // discount: Number(formData.discount),
                // shipping_fee: Number(formData.shipping_fee),
                // gst: Number(formData.gst),
                // total: Number(formData.total)
            }

            console.log(submitData)
            localStorage.setItem('products', JSON.stringify(submitData))
            router.push(routes.eCommerce.order)
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
        setProductForm([
            ...productForm,
            {
                sku: '',
                name: '',
                price: 0,
                buying_price: 0,
                trade: 0,
                silver: 0,
                gold: 0,
                platinum: 0,
                diamond: 0,
                qty: 0,
                tax_rate: '',
                tax_amount: 0,
                total: 0,
            }
        ])
    }


    const handleDateChange = (field: string, value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };

    const handleChangeAddress = (e: any) => {
        const { id, value } = e.target;
        setFormAddress((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeCustomer = (e: any) => {
        const { id, value } = e.target;
        setFormCustomer((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleOpenModal = (btnType: 'oneof' | 'new', modalType: 'billing' | 'shipping') => {
        setModalType(modalType);
        setButtonType(btnType)
        setOpenModal(true);
    }


    console.log(formData, productForm)

    const optionsEmployee = employeeData.map((emp) => ({
        label: emp.employee_name,
        value: emp.employee_name,
        data: { ...emp }
    }));

    useEffect(() => {
        const count_total_income = Number(formData.basic_salary) + Number(formData.overtime) + Number(formData.kpi) + Number(formData.reimbursement) + Number(formData.bonus)
        const count_total_deduction = Number(formData.late_fee) + Number(formData.bpjs_kesehatan) + Number(formData.bpjs_ketenagakerjaan) + Number(formData.pph21) + Number(formData.debt)
        setFormData((prev: any) => ({
            ...prev,
            total_income: count_total_income,
            total_deduction: count_total_deduction,
            total_received: count_total_income + count_total_deduction
        }))

    }, [
        formData.basic_salary,
        formData.overtime,
        formData.kpi,
        formData.reimbursement,
        formData.bonus,
        formData.late_fee,
        formData.bpjs_kesehatan,
        formData.bpjs_ketenagakerjaan,
        formData.pph21,
        formData.debt,

    ])


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode == 'create' ? 'Create Pay Slip' : 'Edit Pay Slip'}</h1>
                <Breadcrumb items={breadcrumb} />
                <Divider />
            </div>

            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-xl font-semibold'>Employee Details</h1>
                            <div className={`grid md:grid-cols-3 gap-4`}>
                                <SelectInput
                                    id='employee_name'
                                    label='Employee Name'
                                    placeholder='Select Employee Name'
                                    onChange={(selected) => {
                                        handleChangeSelect('employee_name', selected);

                                        // cari data lengkap customer yang dipilih
                                        const selectedEmployee = optionsEmployee.find((item) => item.value === selected);

                                        if (selectedEmployee) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                employee_name: selectedEmployee.value,
                                                employee_id: selectedEmployee.data.employee_id,
                                                role: selectedEmployee.data.role,
                                                email: selectedEmployee.data.email,
                                                phone: selectedEmployee.data.phone,
                                                address: selectedEmployee.data.address,
                                                basic_salary: selectedEmployee.data.basic_salary,
                                                overtime: selectedEmployee.data.overtime,
                                                late_fee: selectedEmployee.data.late_fee,
                                                bpjs_kesehatan: selectedEmployee.data.bpjs_kesehatan,
                                                bpjs_ketenagakerjaan: selectedEmployee.data.bpjs_ketenagakerjaan,
                                                pph21: selectedEmployee.data.pph21,
                                            }));
                                        }
                                    }}
                                    value={formData.employee_name}
                                    options={optionsEmployee}
                                    // popupRender={(options: any) => (
                                    //     <>
                                    //         {options}
                                    //         <div className='p-4 flex'>
                                    //             <Button
                                    //                 label='Add New Employee'
                                    //                 onClick={() => setOpenModalCustomer(true)}
                                    //                 hasWidth='w-full'
                                    //             />
                                    //         </div>

                                    //     </>
                                    // )}
                                    required
                                />
                                <Input
                                    id='employee_id'
                                    label='Employee ID'
                                    type='text'
                                    placeholder='Input Employee ID'
                                    onChange={handleChange}
                                    value={formData.employee_id}
                                    disabled
                                    required
                                />
                                <Input
                                    id='role'
                                    label='Role'
                                    type='text'
                                    placeholder='Input Role'
                                    onChange={handleChange}
                                    value={formData.role}
                                    disabled
                                    required
                                />
                                <Input
                                    id='email'
                                    label='Email'
                                    type='text'
                                    placeholder='Input Email'
                                    onChange={handleChange}
                                    value={formData.email}
                                    disabled
                                    required
                                />
                                <Input
                                    id='phone'
                                    label='Phone'
                                    type='text'
                                    placeholder='Input Phone'
                                    onChange={handleChange}
                                    value={formData.phone}
                                    disabled
                                    required
                                />
                                <Input
                                    id='address'
                                    label='Address'
                                    type='text'
                                    placeholder='Input Address'
                                    onChange={handleChange}
                                    value={formData.address}
                                    disabled
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h1 className='text-xl font-semibold'>Pay Slip Details</h1>
                            <div className='grid md:grid-cols-3 gap-3'>
                                <DatePickerInput
                                    id='start_date'
                                    label='Start Date'
                                    value={formData.start_date ? dayjs(formData.start_date, 'DD-MM-YYYY') : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('start_date', value, dateString)}
                                />
                                <DatePickerInput
                                    id='end_date'
                                    label='End Date'
                                    value={formData.end_date ? dayjs(formData.end_date, 'DD-MM-YYYY') : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('end_date', value, dateString)}
                                />
                                <SelectInput
                                    id='payment_method'
                                    label='Payment Method'
                                    placeholder='Select Payment Method'
                                    onChange={(selected) => handleChangeSelect('payment_method', selected)}
                                    value={formData.payment_method}
                                    options={[
                                        { label: 'Paypal', value: 'Paypal' }
                                    ]}
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h1 className='text-xl font-semibold'>Income Summary</h1>
                            <div className='grid md:grid-cols-3 gap-3'>
                                <div className='col-span-full grid md:grid-cols-2 gap-3'>
                                    <Input
                                        id='basic_salary'
                                        label='Basic Salary'
                                        type='text'
                                        placeholder='Input Basic Salary'
                                        onChange={handleChange}
                                        value={formData.basic_salary}
                                        disabled
                                        required
                                    />
                                    <Input
                                        id='overtime'
                                        label='Overtime'
                                        type='text'
                                        placeholder='Input Overtime'
                                        onChange={handleChange}
                                        value={formData.overtime}
                                        disabled
                                        required
                                    />
                                </div>
                                <Input
                                    id='kpi'
                                    label='KPI'
                                    type='text'
                                    placeholder='Input KPI'
                                    onChange={handleChange}
                                    value={formData.kpi}
                                />
                                <Input
                                    id='reimbursement'
                                    label='Reimbursement'
                                    type='text'
                                    placeholder='Input Reimbursement'
                                    onChange={handleChange}
                                    value={formData.reimbursement}
                                />
                                <Input
                                    id='bonus'
                                    label='Bonus'
                                    type='text'
                                    placeholder='Input Bonus'
                                    onChange={handleChange}
                                    value={formData.bonus}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h1 className='text-xl font-semibold'>Deduction Summary</h1>
                            <div className='grid md:grid-cols-3 gap-3'>
                                <Input
                                    id='late_fee'
                                    label='Late Fee'
                                    type='text'
                                    placeholder='Input Late Fee'
                                    onChange={handleChange}
                                    value={formData.late_fee}
                                    disabled
                                    required
                                />
                                <Input
                                    id='bpjs_kesehatan'
                                    label='Bpjs Kesehatan'
                                    type='text'
                                    placeholder='Input Bpjs Kesehatan'
                                    onChange={handleChange}
                                    value={formData.bpjs_kesehatan}
                                    disabled
                                    required
                                />
                                <Input
                                    id='bpjs_ketenagakerjaan'
                                    label='Bpjs Ketenagakerjaan'
                                    type='text'
                                    placeholder='Input Bpjs Ketenagakerjaan'
                                    onChange={handleChange}
                                    value={formData.bpjs_ketenagakerjaan}
                                    disabled
                                    required
                                />
                                <div className='col-span-full grid md:grid-cols-2 gap-3'>
                                    <Input
                                        id='pph21'
                                        label='PPh21'
                                        type='text'
                                        placeholder='Input P'
                                        onChange={handleChange}
                                        value={formData.pph21}
                                        disabled
                                        required
                                    />
                                    <Input
                                        id='debt'
                                        label='Debt'
                                        type='text'
                                        placeholder='Input Debt'
                                        onChange={handleChange}
                                        value={formData.debt}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-3 justify-end'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center text-lg'>
                                    <label className='font-semibold w-50'>Subtotal Income</label>
                                    <span>Rp. {formData.total_income}</span>
                                </div>
                                <div className='flex items-center text-lg'>
                                    <label className='font-semibold w-50'>Subtotal Deduction</label>
                                    <span>Rp. {formData.total_deduction}</span>
                                </div>
                                <Divider />
                                <div className='flex items-center text-lg'>
                                    <label className='font-semibold w-50'>Total Received</label>
                                    <span>Rp. {formData.total_received}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <ButtonCancel
                            label='Cancel'
                            onClick={() => router.push(routes.eCommerce.paySlip)}
                        />
                        <Button
                            label={mode == 'create' ? 'Create Pay Slip' : 'Edit Pay Slip'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormPaySlip;
