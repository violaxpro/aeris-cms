import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import {
  ActionIcon,
  Button,
  Checkbox,
  Input,
  Text,
  Textarea,
  Tooltip,
} from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app_old/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app_old/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import QuillLoader from '@/core/components/loader/quill-loader';
import { FiAlertCircle } from 'react-icons/fi';
import { CreateProductInput } from '@/plugins/validators/create-product.schema';
import CNumberInput from '@/core/ui/number-input';
import { PiPlusBold, PiTrashBold } from 'react-icons/pi';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);

export default function ProductAttribute({
  className,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'attributes',
  });

  return (
    <>
      <FormGroup
        title="Attribute"
        description="Attribute information about the product."
        className={cn(className)}
      >
        {fields.map((item, index) => (
          <div
            key={index}
            className="col-span-full flex items-center gap-4 xl:gap-7"
          >
            <Controller
              name={`attributes.${index}.attribute`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  dropdownClassName="h-auto"
                  options={typeOption}
                  value={value}
                  onChange={onChange}
                  label="Attribute"
                  error={
                    errors?.attributes?.[index]?.attribute?.message as string
                  }
                  getOptionValue={(option) => option.value}
                />
              )}
            />

            <Controller
              name={`attributes.${index}.values`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <MultySelect
                  options={categoryOption}
                  value={value}
                  onChange={onChange}
                  label="Categories"
                  error={errors?.attributes?.[index]?.values?.message as string}
                  dropdownClassName="h-auto"
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
                attribute: '',
                values: [],
              })
            }
          >
            Add Attribute
          </Button>
        </div>

        <div className="col-span-full flex justify-end">
          <Button>Save</Button>
        </div>
      </FormGroup>
    </>
  );
}
