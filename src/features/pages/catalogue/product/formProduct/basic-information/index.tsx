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
import { ChildFormProps } from '@/plugins/types/form-type'
import { uploadImages } from '@/services/upload-images'
import { slugify } from '@/plugins/validators/common-rules'

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });

const BasicInformationProduct = ({ dataById, onChange, formDataCreate }: ChildFormProps) => {
    const [optionBrands] = useAtom(brandsAtom)
    const [optionCategories] = useAtom(categoriesAtom)
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        const updated = { ...formDataCreate, [id]: value };
        if (id === 'productName') {
            formDataCreate.tab_basic_information.slug = slugify(value)
        }
        onChange(updated);
        // setFormData(prev => {
        //     const updated = { ...prev, [id]: value }
        //     onChange(updated)
        //     return updated
        // });
    };

    const handleChangeSelect = (id: string, value: string | string[]) => {
        const updated = { ...formDataCreate, [id]: value }
        onChange(updated);
        // setFormData(prev => {
        //     const updated = { ...prev, [id]: value }
        //     onChange(updated)
        //     return updated
        // });
    };

    const handleCheckbox = (key: string, val: boolean) => {
        const updated = { ...formDataCreate, [key]: val };
        onChange(updated);
    };


    const handleQuillChange = (value: string) => {
        const updated = { ...formDataCreate, description: value };
        onChange(updated);
        // setFormData({ ...formData, description: value });
    };

    const handleSuccess = async (file: any) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'product');
            const res = await uploadImages(formData)
            if (res.success == true) {
                const images = [{
                    name: file.name,
                    url: res?.data?.public_url,
                    default: true,
                    alt_image: file.name
                }]

                const updated = { ...formDataCreate, images: images, }
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
                    // onChange={handleChange}
                    // value={formData.productName}
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.productName}

                />
                <Input
                    id='slug'
                    label='Slug'
                    type='text'
                    placeholder='Slug'
                    // onChange={handleChange}
                    // value={formData.slug}
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.slug}
                />
                <Select
                    id="brand"
                    label="Brand"
                    placeholder="Select Brand"
                    // value={formData.brand}
                    value={formDataCreate.tab_basic_information.brand}
                    onChange={(val) => handleChangeSelect("brand", val)}
                    options={optionBrands}
                />
                <Select
                    id="categories"
                    label="Categories"
                    placeholder="Select Categories"
                    // value={formData.categories}
                    value={formDataCreate.tab_basic_information.categories}
                    onChange={(val) => handleChangeSelect("categories", val)}
                    options={optionCategories}
                />
                <div className='col-span-full w-full'>
                    <QuillInput
                        // value={formData.description}
                        value={formDataCreate.tab_basic_information.description}
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
                        // onChange={handleChange}
                        // value={formData.metaTitle}
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.metaTitle}
                        notes='min.50 / max.65, Character 0'
                    />
                </div>
                <div className='col-span-full w-full'>
                    <TextArea
                        id='metaDescription'
                        label='Meta Description'
                        placeholder='Input Meta Description'
                        // onChange={handleChange}
                        // value={formData.metaDescription}
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.metaDescription}
                        notes='min.50 / max.65, Character 0'
                    />
                </div>
                <Select
                    id="taxClass"
                    label="Tax Class"
                    placeholder="Select Tax Class"
                    value={formDataCreate.tab_basic_information.taxClass}
                    // value={formData.taxClass}
                    onChange={(val) => handleChangeSelect("taxClass", val)}
                    options={optionsTaxClass}
                />
                <Select
                    id="tags"
                    modeType='tags'
                    label="Tags"
                    placeholder="Select Tags"
                    onChange={(val) => handleChangeSelect("tags", val)}
                    // value={formData.tags}
                    value={formDataCreate.tab_basic_information.tags}
                    options={optionsTagClass}
                />
                <Input
                    id='manualUrl'
                    label='Manual URL'
                    type='text'
                    placeholder='Input Manual URL'
                    // onChange={handleChange}
                    // value={formData.manualUrl}
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.manualUrl}
                />
                <Input
                    id='warranty'
                    label='Warranty (month)'
                    type='number'
                    placeholder='Warranty (month)'
                    // onChange={handleChange}
                    // value={formData.warranty}
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.warranty}
                />
                <CheckboxInput
                    label='Status'
                    text="Check this to enable this product"
                    // checked={formData.status}
                    checked={formDataCreate.tab_basic_information.status}
                    onChange={(val) => handleCheckbox('status', val)}
                />

            </FormGroup>
            <div className='flex justify-end'>
                <Button
                    label='Save'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
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
                    // onChange={handleChange}
                    // value={formData.sku}
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.sku}
                />
                <Input
                    id='sku2'
                    label='SKU2'
                    type='text'
                    placeholder='Input SKU2'
                    // onChange={handleChange}
                    // value={formData.sku2}
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.sku2}
                />
                <Input
                    id='mpn'
                    label='MPN'
                    type='text'
                    placeholder='Input MPN'
                    // onChange={handleChange}
                    // value={formData.mpn}
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.mpn}
                />
                <Select
                    id="inventoryManagement"
                    label="Inventory Management"
                    placeholder="Select Inventory Management"
                    value={formDataCreate.tab_basic_information.inventory_management}
                    onChange={(val) => handleChangeSelect("inventory_management", val)}
                    options={optionsInventoryManagement}
                />
                {
                    formDataCreate.tab_basic_information.inventory_management == '2' &&
                    <Input
                        id='qty'
                        label='Qty'
                        type='number'
                        placeholder='qty'
                        // onChange={handleChange}
                        // value={formData.qty}
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.qty}
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
                    // value={formData.stock}
                    value={formDataCreate.tab_basic_information.stock}
                    onChange={(val) => handleChangeSelect("stock", val)}
                    options={options}
                />
                <div className='flex col-span-full w-full gap-2'>
                    <CheckboxInput
                        text="Best Seller"
                        checked={formDataCreate.tab_basic_information.isBestSeller}
                        onChange={(val) => handleCheckbox('isBestSeller', val)}
                    />
                    <CheckboxInput
                        text="Back Order"
                        checked={formDataCreate.tab_basic_information.isBackOrder}
                        onChange={(val) => handleCheckbox('isBackOrder', val)}
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
                        label='Images'
                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                        multiple={true}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        isUpload={isLoading}
                        fileList={formDataCreate.tab_basic_information.images?.map((img: any, index: any) => {
                            return {
                                uid: `${index}`,
                                name: img.name ?? img.url,
                                status: 'done',
                                url: img.url
                            }
                        })}
                    />
                    {/* <FileUploader
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
                    /> */}
                </div>

            </FormGroup>

        </div>
    )
}

export default BasicInformationProduct
