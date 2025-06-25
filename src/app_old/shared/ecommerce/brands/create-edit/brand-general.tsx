import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Input, Text } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app_old/shared/form-group';

import CNumberInput from '@/core/ui/number-input';
import { BrandFormInput } from '@/plugins/validators/create-brand.schema';

export default function BrandGeneral({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<BrandFormInput>();

  return (
    <FormGroup
      title="General"
      description="General information about the brand."
      className={cn(className)}
    >
      <Input
        label="Name"
        placeholder="Name"
        {...register('name')}
        error={errors.name?.message as string}
      />

      <Controller
        name="discount"
        control={control}
        render={({ field }) => (
          <CNumberInput
            {...field}
            label="Discount Percentage"
            placeholder="10"
            suffix="%"
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div>
            <Text fontWeight="semibold" className="mb-[6px]">
              Status
            </Text>
            <Checkbox
              checked={value}
              onChange={onChange}
              label="Check this to enable this brand"
              className="col-span-full"
            />
          </div>
        )}
      />
    </FormGroup>
  );
}
