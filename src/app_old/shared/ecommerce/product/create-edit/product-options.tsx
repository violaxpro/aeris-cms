import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ActionIcon, Button, Checkbox, Input } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app_old/shared/form-group';
import {
  globalTypeOptions,
  typeOptions,
} from '@/app_old/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import { CreateProductInput } from '@/plugins/validators/create-product.schema';
import CNumberInput from '@/core/ui/number-input';
import { PiPlusBold, PiTrashBold } from 'react-icons/pi';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function ProductOptions({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'options',
  });

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="Options"
        description="Options information about the product."
        className={cn(className)}
      >
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="col-span-full flex items-center gap-4 xl:gap-7"
          >
            <div className="grid w-full gap-4 @2xl:grid-cols-2">
              <Input
                label="Name"
                placeholder="Option Name"
                {...register(`options.${index}.optionName`)}
                error={errors.options?.[index]?.optionName?.message as string}
              />

              <Controller
                name={`options.${index}.optionType`}
                control={control}
                render={({ field }) => (
                  <Select
                    dropdownClassName="h-auto"
                    options={typeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    label="Option Type"
                    error={
                      errors.options?.[index]?.optionType?.message as string
                    }
                    getOptionValue={(option) => option?.value}
                  />
                )}
              />
              <Controller
                name={`options.${index}.optionRequired`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    label="Required"
                  />
                )}
              />

              <GlobalOptions index={index} />
            </div>

            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <PiTrashBold className="h-4 w-4" />
            </ActionIcon>
          </div>
        ))}

        <div className="col-span-full flex justify-end">
          <Button
            variant="flat"
            className="w-full text-xs capitalize @lg:w-auto sm:text-sm"
            onClick={() =>
              append({
                globalOptions: [],
                optionName: '',
                optionType: '',
                optionRequired: false,
              })
            }
          >
            Add Options
          </Button>
        </div>

        <div className="col-span-full flex justify-end">
          <Button>Save</Button>
        </div>
      </FormGroup>
    </div>
  );
}

function GlobalOptions({ index }: { index: number }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `options.${index}.globalOptions`,
  });

  return (
    <div className="flex flex-col gap-4">
      {fields?.map((item, idx) => (
        <div key={idx} className="flex gap-4">
          <Controller
            name={`options.${index}.globalOptions.${idx}`}
            control={control}
            render={({ field }) => (
              <Select
                value={field.value.optionName}
                onChange={(value) => field.onChange({ optionName: value })}
                options={globalTypeOptions}
                label="Global Options"
                labelClassName="text-xs"
                dropdownClassName="h-auto"
                error={
                  errors.options?.[index]?.globalOptions?.[idx]?.optionName
                    ?.message as string
                }
                getOptionDisplayValue={(option) => option?.label}
                getOptionValue={(option) => option?.value}
              />
            )}
          />

          <ActionIcon
            onClick={() => remove(idx)}
            variant="flat"
            className="mt-7 shrink-0"
          >
            <PiTrashBold className="h-4 w-4" />
          </ActionIcon>
        </div>
      ))}
      <Button
        variant="flat"
        className="w-full text-xs capitalize @lg:w-auto sm:text-sm"
        onClick={() => append({ optionName: '' })}
      >
        <PiPlusBold className="h-4 w-4" /> Add Global Options
      </Button>
    </div>
  );
}
