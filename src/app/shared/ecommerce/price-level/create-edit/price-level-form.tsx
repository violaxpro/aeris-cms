import { Controller, useFormContext } from 'react-hook-form';
import { Input, Text } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import CNumberInput from '@/core/ui/number-input';
import { CreatePriceLevelInput } from '@/validators/create-price-level.schema';
import CSelect from '@/core/ui/select';

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

export default function PriceLevelForm({ className }: { className?: string }) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreatePriceLevelInput>();

  return (
    <>
      <FormGroup
        title="General"
        description="General information about the price level."
        className={cn(className)}
      >
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <CSelect
              {...field}
              placeholder="Select a brand"
              options={typeOption}
              label="Brand"
              error={errors?.brand?.message as string}
            />
          )}
        />

        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <MultySelect
              options={categoryOption}
              {...field}
              label="Categories"
              error={errors?.categories?.message as string}
              dropdownClassName="h-auto"
            />
          )}
        />

        <Controller
          name="subCategories"
          control={control}
          render={({ field }) => (
            <MultySelect
              options={categoryOption}
              {...field}
              label="Categories"
              error={errors?.subCategories?.message as string}
              dropdownClassName="h-auto"
            />
          )}
        />

        <Controller
          control={control}
          name="warranty"
          render={({ field }) => (
            <CNumberInput label="Warranty" placeholder="mounth" {...field} />
          )}
        />
      </FormGroup>
    </>
  );
}
