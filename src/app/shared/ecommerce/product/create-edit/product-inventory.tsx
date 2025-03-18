import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Input, Text } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  supplierOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import QuillLoader from '@/core/components/loader/quill-loader';
import ProductPricing from './product-pricing';
import { FiAlertCircle } from 'react-icons/fi';
import { CreateProductInput } from '@/validators/create-product.schema';
import CNumberInput from '@/core/ui/number-input';

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

const QuillEditor = dynamic(() => import('@/core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductInventory({
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

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="Inventory"
        description="Add your product inventory info here for the product."
        className={cn(className)}
      >
        <Input
          label="SKU"
          placeholder="sku"
          {...register('sku')}
          error={errors.sku?.message as string}
        />

        <Input
          label="SKU2"
          placeholder="sku2"
          {...register('sku2')}
          error={errors.sku2?.message as string}
        />

        <Input
          label="MPN"
          placeholder="mpn"
          {...register('mpn')}
          error={errors.mpn?.message as string}
        />

        <Controller
          name="inventoryManagement"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              dropdownClassName="h-auto"
              options={typeOption}
              value={value}
              onChange={onChange}
              label="Inventory Management"
              error={errors?.inventoryManagement?.message as string}
              getOptionValue={(option) => option.value}
            />
          )}
        />
      </FormGroup>
    </div>
  );
}
