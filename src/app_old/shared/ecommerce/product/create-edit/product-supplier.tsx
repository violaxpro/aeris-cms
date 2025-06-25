import SelectLoader from '@/core/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ActionIcon, Button, Input, NumberInput, Tooltip } from 'rizzui';
import { supplierOption } from './form-utils';
import FormGroup from '@/app_old/shared/form-group';
import { CreateProductInput } from '@/plugins/validators/create-product.schema';
import CNumberInput from '@/core/ui/number-input';
import { PiPlusBold, PiTrashBold } from 'react-icons/pi';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function ProductSupplier() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  const { supplier } = watch();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'supplier',
  });

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup title="Supplier" description="Supplier information.">
        {fields?.map((item, index) => (
          <div
            key={index}
            className="col-span-full flex items-center gap-4 xl:gap-7"
          >
            <Controller
              name={`supplier.${index}.supplierName`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Supplier Name"
                  dropdownClassName="h-auto"
                  options={supplierOption}
                  value={value}
                  searchable
                  onChange={onChange}
                  error={
                    errors?.supplier?.[index]?.supplierName?.message as string
                  }
                  getOptionValue={(option) => option.value}
                />
              )}
            />

            <Controller
              name={`supplier.${index}.supplierExistingPrice`}
              control={control}
              render={({ field }) => (
                <CNumberInput
                  {...field}
                  label="Best Price"
                  placeholder="10"
                  error={
                    errors?.supplier?.[index]?.supplierExistingPrice
                      ?.message as string
                  }
                  prefix={'$'}
                />
              )}
            />

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
                supplierName: '',
                supplierExistingPrice: 0,
              })
            }
          >
            Add Supplier
          </Button>
        </div>
      </FormGroup>
    </div>
  );
}
