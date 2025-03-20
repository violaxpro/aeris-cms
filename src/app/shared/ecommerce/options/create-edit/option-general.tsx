import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app/shared/form-group';

import dynamic from 'next/dynamic';
import CSelect from '@/core/ui/select';
import { typeOptions } from './form-utils';
import CCheckbox from '@/core/ui/checkbox';
import SelectLoader from '@/core/components/loader/select-loader';
import { OptionFormInput } from '@/validators/create-option.schema';

export default function OptionGeneral({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<OptionFormInput>();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="General"
        description="General information about the attribute."
        className={cn(className)}
      >
        <Input
          label="Name"
          placeholder="Name"
          {...register('name')}
          error={errors.name?.message as string}
        />

        <Controller
          name="optionType"
          control={control}
          render={({ field }) => (
            <CSelect
              {...field}
              clearable
              onClear={() => field.onChange('')}
              label="Option Type"
              placeholder="Select Option Type"
              options={typeOptions}
              error={errors.optionType?.message as string}
            />
          )}
        />

        <Controller
          name="required"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CCheckbox
              label="Required"
              checkBoxLabel="Check this to enable this option"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </FormGroup>
    </div>
  );
}
