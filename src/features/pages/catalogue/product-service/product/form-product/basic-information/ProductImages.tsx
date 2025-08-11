import React, { useState } from 'react'
import FormGroup from '@/components/form'
import FileUploader from '@/components/input-file'

const ProductStockAvailability = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        base_images: '',
        additional_images: '',

    });

    const handleSuccess = (file: any) => {
        console.log('Uploaded:', file);
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    return (
        <div>
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

export default ProductStockAvailability
