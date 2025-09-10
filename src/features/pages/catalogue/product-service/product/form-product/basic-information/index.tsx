import React, { useEffect, useState } from 'react'
import FormGroup from '@/components/form-group'
import Input from "@/components/input"
import Select from "@/components/select"
import TextArea from "@/components/textarea"
import CheckboxInput from '@/components/checkbox'
import Button from "@/components/button"
import FileUploader from '@/components/input-file'
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai'
import {
    brandsAtom,
    categoriesAtom,
    taxSetAtom,
    tagSetAtom,
} from '@/store/DropdownItemStore'
import { ChildFormProps } from '@/plugins/types/form-type'
import { uploadImages } from '@/services/upload-images'
import { slugify } from '@/plugins/validators/common-rules'
import SelectTreeInput from '@/components/select/TreeSelect'

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });

const BasicInformationProduct = ({ dataById, onChange, formDataCreate, errors }: ChildFormProps) => {
    const [optionBrands] = useAtom(brandsAtom)
    const [optionCategories] = useAtom(categoriesAtom)
    const [optionTaxs] = useAtom(taxSetAtom)
    const [optionTags] = useAtom(tagSetAtom)
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        let updated = {
            ...formDataCreate.tab_basic_information,
            [id]: value,
        };

        if (id === 'productName') {
            updated = { ...updated, slug: slugify(value) };
        }
        onChange(updated);
    };

    const handleChangeSelect = (id: string, value: string | string[]) => {
        const updated = { ...formDataCreate.tab_basic_information, [id]: value }
        onChange(updated);
        // setFormData(prev => {
        //     const updated = { ...prev, [id]: value }
        //     onChange(updated)
        //     return updated
        // });
    };

    const handleCheckbox = (key: string, val: boolean) => {
        const updated = { ...formDataCreate.tab_basic_information, [key]: val };
        onChange(updated);
    };


    const handleQuillChange = (value: string) => {
        const updated = { ...formDataCreate.tab_basic_information, description: value };
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
                    // name: file.name,
                    url: res?.data?.public_url,
                    // default: true,
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

    const metaTitle = formDataCreate.tab_basic_information.metaTitle;
    const titleLength = metaTitle.length;
    const isTitleInvalid = titleLength !== 0 && (titleLength < 55 || titleLength > 65)

    const metaDescription = formDataCreate.tab_basic_information.metaDescription;
    const descLength = metaDescription.length;
    const isDescInvalid = descLength !== 0 && (descLength < 155 || descLength > 165)
    return (
        <div className='flex flex-col gap-10'>
            <FormGroup
                title="General"
                description="General information about the product."
                childClassName='flex flex-col gap-4'
            >
                <div className='grid md:grid-cols-4 gap-4'>
                    <Input
                        id='productName'
                        label='Name'
                        type='text'
                        placeholder='Enter product name (e.g. Battery 12V X 7.0 AMP)'
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.productName}
                        errorMessage={errors.name}

                    />
                    <Input
                        id='slug'
                        label='Slug'
                        type='text'
                        placeholder='auto-generated-slug'
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.slug}
                    />
                    <Select
                        id="brand"
                        label="Brand"
                        placeholder="Select brand (e.g. Panasonic)"
                        value={formDataCreate.tab_basic_information.brand || undefined}
                        onChange={(val) => handleChangeSelect("brand", val)}
                        options={optionBrands}
                    />
                    <SelectTreeInput
                        id="categories"
                        label="Categories"
                        placeholder="Select category (e.g. Electronics)"
                        value={formDataCreate.tab_basic_information.categories || undefined}
                        onChange={(val: any) => handleChangeSelect("categories", val)}
                        treeData={optionCategories}
                    />
                </div>

                <div className='col-span-full w-full'>
                    <QuillInput
                        placeholder='Write detailed product description'
                        value={formDataCreate.tab_basic_information.description}
                        onChange={handleQuillChange}
                        label="Description"
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                        error={errors.description}
                    />
                </div>
                <div className='grid md:grid-cols-2 gap-4'>
                    <TextArea
                        id='metaTitle'
                        label='Meta Title'
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.metaTitle}
                        notes={
                            <span className={isTitleInvalid ? 'text-red-500' : 'text-gray-400'}>
                                min.55 / max.65, Character {titleLength}
                            </span>
                        }
                        textareaClassname='!h-20'
                        placeholder='Enter SEO-friendly title'
                    />
                    <TextArea
                        id='metaDescription'
                        label='Meta Description'
                        placeholder='Enter SEO-friendly description'
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.metaDescription}
                        notes={
                            <span className={isDescInvalid ? 'text-red-500' : 'text-gray-400'}>
                                min.145 / max.165, Character {descLength}
                            </span>
                        }
                        textareaClassname='!h-20'
                    />
                </div>
                <div className='grid md:grid-cols-2 gap-4'>
                    <Select
                        id="taxClass"
                        label="Tax Class"
                        placeholder="Select applicable tax class"
                        value={formDataCreate.tab_basic_information.taxClass || undefined}
                        onChange={(val) => handleChangeSelect("taxClass", val)}
                        options={optionTaxs}
                    />
                    <Select
                        id="tags"
                        modeType='tags'
                        label="Tags"
                        placeholder="Add tags (e.g. power, battery, electronics)"
                        onChange={(val) => handleChangeSelect("tags", val)}
                        value={formDataCreate.tab_basic_information.tags}
                        options={optionTags}
                    />
                </div>
                <div className='grid md:grid-cols-3 gap-4'>
                    <Input
                        id='manualUrl'
                        label='Manual URL'
                        type='text'
                        placeholder='https://example.com/manualurl'
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.manualUrl}
                    />
                    <Input
                        id='warranty'
                        label='Warranty (month)'
                        type='number'
                        placeholder='Enter warranty period (e.g. 12)'
                        onChange={handleChange}
                        value={formDataCreate.tab_basic_information.warranty}
                    />
                    <div className='md:my-2'>
                        <CheckboxInput
                            label='Status'
                            text="Check this to enable this product"
                            checked={formDataCreate.tab_basic_information.status}
                            onChange={(val) => handleCheckbox('status', val)}
                        />
                    </div>
                    {/* <div className='col-span-full flex justify-end'>
                        <Button
                            label='Save'
                        />
                    </div> */}
                </div>
            </FormGroup>

            <FormGroup
                title="Inventory"
                description="Add your product inventory info here for the product."
                childClassName='grid md:grid-cols-3 gap-4'
            >
                <Input
                    id='sku'
                    label='SKU'
                    type='text'
                    placeholder='Enter unique SKU (e.g. BAT-12V-7000)'
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.sku}
                    errorMessage={errors.sku}
                />
                <Input
                    id='sku2'
                    label='SKU2'
                    type='text'
                    placeholder='Enter secondary SKU (optional)'
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.sku2}
                />
                <Input
                    id='mpn'
                    label='MPN'
                    type='text'
                    placeholder='Enter manufacturer part number (e.g. MPN-12345)'
                    onChange={handleChange}
                    value={formDataCreate.tab_basic_information.mpn}
                />
            </FormGroup>

            <FormGroup
                title="Product Status"
                description="Product status info here"
                childClassName='grid md:grid-cols-12 gap-4'
            >
                <div className='flex col-span-4 w-full gap-2 items-center justify-start'>
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
                        errorMessage={errors.images}
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
