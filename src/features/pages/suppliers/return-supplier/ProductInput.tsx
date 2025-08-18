import React, { useState } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import { CancelGreyIcon } from '@public/icon';
import ButtonIcon from '@/components/button/ButtonIcon';
import FileUploader from '@/components/input-file';
import { uploadImages } from '@/services/upload-images';
import { ImagesType } from '@/plugins/types';

export interface ProductForm {
    sku: string
    name: string
    price: string
    return_type: string
    current_serial_number: string
    reason: string
    product_return: boolean
    status: string,
    evidence: ImagesType[]
    product_condition: string
    packaging_condition: string
    is_no_missing_part: boolean
    is_serial_number_match: boolean
}

interface ProductInputProps {
    productForm: ProductForm
    // setProductForm: React.Dispatch<React.SetStateAction<ProductForm>>
    // onAddProduct: () => void
    onChange: (form: ProductForm) => void;
    onRemove?: () => void;
    index: number;
    length?: number
}

const ProductInput = ({
    productForm,
    // setProductForm,
    // onAddProduct
    onChange,
    onRemove,
    index,
    length,
}: ProductInputProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleProductChange = (e: any) => {
        const { id, value } = e.target;
        const updated = { ...productForm, [id]: value }
        onChange(updated);
    };

    const handleProductCheckbox = (field: string, checked: boolean) => {
        const updated = { ...productForm, [field]: checked }
        onChange(updated);
    };

    const handleSuccess = async (file: any) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'rma_sales');
            const res = await uploadImages(formData)
            if (res.success == true) {
                const images = [{
                    name: file.name,
                    url: res?.data?.public_url,
                    default: true,
                    alt_image: file.name
                }]

                const updated = { ...productForm, evidence: images, }
                onChange(updated)
                // setFormData(prev => {
                //     const updated = { ...prev, images: images, }
                //     // images: [...prev.images, ...images], > 1 gambar
                //     onChange(updated)
                //     return updated
                // });
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    // const handleAddProduct = () => {
    //     onAddProduct()
    // };

    return (
        <div className='flex flex-col gap-5 border p-6 rounded-xl border-[#E5E7EB]'>
            <div className='w-full flex justify-between items-center'>
                <h4 className='text-lg font-semibold'>Product List</h4>
                <ButtonIcon
                    icon={CancelGreyIcon}
                    shape='circle'
                    variant='filled'
                    color='default'
                    onClick={onRemove}
                />
            </div>
            <div className='grid md:grid-cols-[1fr_2fr_1fr_1fr_1.5fr_1fr_1fr] gap-4 mb-6'>
                <Input
                    id='sku'
                    type='text'
                    label='SKU'
                    value={productForm.sku}
                    onChange={handleProductChange}
                    className='mb-1'
                    required

                />
                <div className='flex flex-col'>
                    <Input
                        id='name'
                        type='text'
                        label='Product Name'
                        value={productForm.name}
                        onChange={handleProductChange}
                        className='mb-1'
                        required
                    />
                    <span className='text-xs text-gray-300'>Eligible - 2 Months Left - 3 Years Warranty</span>
                </div>

                <Input
                    id='price'
                    type='text'
                    label='Price'
                    value={productForm.price}
                    onChange={handleProductChange}
                    className='mb-1'
                    required

                />
                <Input
                    id='current_serial_number'
                    type='text'
                    label='Serial Number'
                    value={productForm.current_serial_number}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />
                <Input
                    id='reason'
                    type='text'
                    label='Reason'
                    value={productForm.reason}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />
                <SelectInput
                    id='return_type'
                    label='Return Type'
                    placeholder='Select Return Type'
                    value={productForm.return_type}
                    onChange={handleProductChange}
                    options={[
                        { label: 'Change New Product', value: 'Change New Product' },
                        { label: 'Credit', value: 'Credit' },
                        { label: 'Refund', value: 'Refund' },
                        { label: 'Other', value: 'Other' },
                    ]}
                    required
                />
                <SelectInput
                    id='status'
                    label='Status'
                    placeholder='Select Status'
                    value={productForm.status}
                    onChange={handleProductChange}
                    options={[
                        { label: 'Pending Approval', value: 'Pending Approval' },
                        { label: 'Awaiting Vendor', value: 'Authorization' },
                        { label: 'Awaiting Shipment', value: 'Awaiting Shipment' },
                        { label: 'Shipped', value: 'Shipped' },
                        { label: 'Closed', value: 'Closed' },
                        { label: 'Rejected', value: 'Rejected' },
                    ]}
                />
                <div className='col-span-full grid md:grid-cols-[3fr_1fr_1fr_2fr] gap-4 items-center'>
                    <FileUploader
                        label='Upload Evidence'
                        iconClassName='flex-row -mt-2'
                        className='!h-10 flex flex-col'
                        style={{ border: '1px dashed #2847FB4D', background: '#2847FB08' }}
                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                        multiple={true}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        isUpload={isLoading}
                        fileList={productForm.evidence?.map((img: any, index: any) => {
                            return {
                                uid: `${index}`,
                                name: img.name ?? img.url,
                                status: 'done',
                                url: img.url
                            }
                        })}
                        required
                    />
                    <SelectInput
                        id='product_condition'
                        label='Product Condition'
                        placeholder='Select Product Condition'
                        value={productForm.product_condition}
                        onChange={handleProductChange}
                        options={[
                            { label: 'New', value: 'New' },
                            { label: 'Like-New', value: 'Like-New' },
                            { label: 'Used-Minor', value: 'Used-Minor' },
                            { label: 'Used-Major', value: 'Used-Major' },
                            { label: 'Damage', value: 'Damage' },
                        ]}
                    />
                    <SelectInput
                        id='packaging_condition'
                        label='Packaging Condition'
                        placeholder='Select Packaging Condition'
                        value={productForm.packaging_condition}
                        onChange={handleProductChange}
                        options={[
                            { label: 'Original', value: 'Original' },
                            { label: 'Replacement', value: 'Replacement' },
                            { label: 'None', value: 'None' },

                        ]}
                    />
                    <div className='flex flex-col pt-5'>
                        <CheckboxInput
                            checked={productForm.is_no_missing_part}
                            onChange={handleProductChange}
                            text='No missing parts'
                        />
                        <CheckboxInput
                            checked={productForm.is_serial_number_match}
                            onChange={handleProductChange}
                            text='Serial number(s) match the original purchase'
                        />
                    </div>
                </div>

            </div>
        </div>


    )
}

export default ProductInput
