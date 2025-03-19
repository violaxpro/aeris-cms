import { useFormContext } from 'react-hook-form';
import { FieldError } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import UploadZone from '@/core/ui/file-upload/upload-zone';
import { BrandFormInput } from '@/validators/create-brand.schema';

export default function BrandImages({ className }: { className?: string }) {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<BrandFormInput>();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup title="Images" description="Add your category images here">
        <div className="">
          <UploadZone
            name="logo"
            label="Logo Image"
            getValues={getValues}
            setValue={setValue}
          />
          <FieldError error={errors.logo?.message as string} />
        </div>

        <div className="">
          <UploadZone
            name="banner"
            label="Banner Image"
            getValues={getValues}
            setValue={setValue}
          />
          <FieldError error={errors.banner?.message as string} />
        </div>
      </FormGroup>
    </div>
  );
}
