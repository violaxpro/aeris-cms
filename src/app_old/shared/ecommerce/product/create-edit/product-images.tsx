import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import FormGroup from '@/app_old/shared/form-group';
import { CreateProductInput } from '@/plugins/validators/create-product.schema';
import Upload from '@/core/ui/upload';
import UploadZone from '@/core/ui/file-upload/upload-zone';

export default function ProductImages() {
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup title="Images" description="Add your product images here">
        <UploadZone
          name="baseImage"
          label="Base Image"
          getValues={getValues}
          setValue={setValue}
        />
        {!!errors.baseImage?.message && (
          <p role="alert" className="mt-1.5 text-xs text-red">
            {errors.baseImage?.message as string}
          </p>
        )}
        <UploadZone
          name="additionalImages"
          label="Additional Image"
          getValues={getValues}
          setValue={setValue}
        />
        {!!errors.additionalImages?.message && (
          <p role="alert" className="mt-1.5 text-xs text-red">
            {errors.additionalImages?.message as string}
          </p>
        )}
      </FormGroup>
    </div>
  );
}
