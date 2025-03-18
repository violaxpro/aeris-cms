import SelectLoader from '@/core/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ActionIcon, Button, Input, NumberInput, Text, Tooltip } from 'rizzui';
import { supplierOption } from './form-utils';
import FormGroup from '@/app/shared/form-group';
import { CreateProductInput } from '@/validators/create-product.schema';
import CNumberInput from '@/core/ui/number-input';
import { PiPlusBold, PiTrashBold } from 'react-icons/pi';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function ProductKitPrice() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'kitPriceProduct',
  });

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup title="Kit Price" description="Kit Price information.">
        {fields.length > 0 && (
          <Text fontWeight="semibold">Kit Price Products</Text>
        )}
        {fields?.map((item, index) => (
          <div
            key={index}
            className="col-span-full flex items-center gap-4 xl:gap-7"
          >
            <Controller
              name={`kitPriceProduct.${index}.kitPriceName`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Product Name"
                  dropdownClassName="h-auto"
                  options={supplierOption}
                  value={value}
                  searchable
                  onChange={onChange}
                  error={
                    errors?.kitPriceProduct?.[index]?.kitPriceName
                      ?.message as string
                  }
                  getOptionValue={(option) => option.value}
                />
              )}
            />

            <ActionIcon
              onClick={() => remove(index)}
              className="mt-7 shrink-0"
              variant="flat"
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
                kitPriceName: '',
              })
            }
          >
            Add Kit Price Product
          </Button>
        </div>
      </FormGroup>
    </div>
  );
}
