import React, { useEffect, useState } from 'react'
import FormGroup from '@/components/form'
import Input from "@/components/input"
import Select from "@/components/select"
import TextArea from "@/components/textarea"
import CheckboxInput from '@/components/checkbox'
import Button from "@/components/button"
import FileUploader from '@/components/input-file'
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai'
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore'

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });

const ProductGeneral = ({ className }: { className?: string }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const [optionCategories] = useAtom(categoriesAtom)

    const [formData, setFormData] = useState({
        productName: '',
        brand: '',
        categories: '',
        description: '',
        metaTitle: '',
        metaDescription: '',
        taxClass: '',
        tags: [],
        manualUrl: '',
        warranty: '',
        status: false,
        sku: '',
        sku2: '',
        mpn: '',
        inventory_management: '',
        qty: '',
        stock: '',
        isBestSeller: false,
        isBackOrder: false,
        base_images: '',
        additional_images: '',
    });

    console.log(formData)

    console.log(optionBrands, optionCategories)

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

    const handleQuillChange = (value: string) => {
        setFormData({ ...formData, description: value });
    };

    const handleSuccess = (file: any) => {
        console.log('Uploaded:', file);
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    const optionsTaxClass = [
        { value: '1', label: 'GST' },
        { value: '2', label: 'GSB' },
    ]

    const optionsTagClass = [
        { value: 'baju', label: 'Baju' },
        { value: 'winter', label: 'Winter' },
    ]

    const optionsInventoryManagement = [
        { value: '1', label: "Don't Track Inventory" },
        { value: '2', label: 'Track Inventory' },
    ]

    const options = [
        { value: '1', label: "End of Life" },
        { value: '2', label: 'Call Us' },
        { value: '3', label: 'In Stock' },
        { value: '4', label: 'Out of Stock' },
    ]

    return (
        <div>
            <FormGroup
                title="General"
                description="General information about the product."
            >
                <Input
                    id='productName'
                    label='Name'
                    type='text'
                    placeholder='Product Name'
                    onChange={handleChange}
                    value={formData.productName}
                />
                <Select
                    id="brand"
                    label="Brand"
                    placeholder="Select Brand"
                    value={formData.brand}
                    onChange={(val) => handleChangeSelect("brand", val)}
                    options={optionBrands}
                />
                <Select
                    id="categories"
                    label="Categories"
                    placeholder="Select Categories"
                    value={formData.categories}
                    onChange={(val) => handleChangeSelect("categories", val)}
                    options={optionCategories}
                />
                <div className='col-span-full w-full'>
                    <QuillInput
                        value={formData.description}
                        onChange={handleQuillChange}
                        label="Description"
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                </div>
                <div className='col-span-full w-full'>
                    <Input
                        id='metaTitle'
                        label='Meta Title'
                        type='text'
                        placeholder='Input Meta Title'
                        onChange={handleChange}
                        value={formData.metaTitle}
                        notes='min.50 / max.65, Character 0'
                    />
                </div>
                <div className='col-span-full w-full'>
                    <TextArea
                        id='metaDescription'
                        label='Meta Description'
                        placeholder='Input Meta Description'
                        onChange={handleChange}
                        value={formData.metaDescription}
                        notes='min.50 / max.65, Character 0'
                    />
                </div>
                <Select
                    id="taxClass"
                    label="Tax Class"
                    placeholder="Select Tax Class"
                    value={formData.taxClass}
                    onChange={(val) => handleChangeSelect("taxClass", val)}
                    options={optionsTaxClass}
                />
                <Select
                    id="tags"
                    modeType='tags'
                    label="Tags"
                    placeholder="Select Tags"
                    onChange={(val) => handleChangeSelect("tags", val)}
                    value={formData.tags}
                    options={optionsTagClass}
                />
                <Input
                    id='manualUrl'
                    label='Manual URL'
                    type='text'
                    placeholder='Input Manual URL'
                    onChange={handleChange}
                    value={formData.manualUrl}
                />
                <Input
                    id='warranty'
                    label='Warranty (month)'
                    type='number'
                    placeholder='Warranty (month)'
                    onChange={handleChange}
                    value={formData.warranty}
                />
                <CheckboxInput
                    label='Status'
                    text="Check this to enable this product"
                    checked={formData.status}
                    onChange={(val) => setFormData({ ...formData, status: val })}
                />

            </FormGroup>
            <div className='flex justify-end'>
                <Button
                    label='Save'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                />
            </div>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
            <FormGroup
                title="Inventory"
                description="Add your product inventory info here for the product."
            >
                <Input
                    id='sku'
                    label='SKU'
                    type='text'
                    placeholder='Input SKU'
                    onChange={handleChange}
                    value={formData.sku}
                />
                <Input
                    id='sku2'
                    label='SKU2'
                    type='text'
                    placeholder='Input SKU2'
                    onChange={handleChange}
                    value={formData.sku2}
                />
                <Input
                    id='mpn'
                    label='MPN'
                    type='text'
                    placeholder='Input MPN'
                    onChange={handleChange}
                    value={formData.mpn}
                />
                <Select
                    id="inventoryManagement"
                    label="Inventory Management"
                    placeholder="Select Inventory Management"
                    value={formData.inventory_management}
                    onChange={(val) => handleChangeSelect("inventory_management", val)}
                    options={optionsInventoryManagement}
                />
                {
                    formData.inventory_management == '2' &&
                    <Input
                        id='qty'
                        label='Qty'
                        type='number'
                        placeholder='qty'
                        onChange={handleChange}
                        value={formData.qty}
                    />
                }
            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

            <FormGroup
                title="Stock Availability"
                description="Add your stock info here"
            >
                <Select
                    id="stock"
                    label="Stock Availability"
                    placeholder="Select Stock Availability"
                    value={formData.stock}
                    onChange={(val) => handleChangeSelect("stock", val)}
                    options={options}
                />
                <div className='flex col-span-full w-full gap-2'>
                    <CheckboxInput
                        text="Best Seller"
                        checked={formData.isBestSeller}
                        onChange={(val) => setFormData({ ...formData, isBestSeller: val })}
                    />
                    <CheckboxInput
                        text="Back Order"
                        checked={formData.isBackOrder}
                        onChange={(val) => setFormData({ ...formData, isBackOrder: val })}
                    />
                </div>
            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

            <FormGroup
                title="Images"
                description="Add your product images here"
            >
                <div className='flex col-span-full gap-4'>
                    <FileUploader
                        label='Base Images'
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        multiple={true}
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                    <FileUploader
                        label='Additional Images'
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        multiple={true}
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>

            </FormGroup>

        </div>
    )
}

export default ProductGeneral
