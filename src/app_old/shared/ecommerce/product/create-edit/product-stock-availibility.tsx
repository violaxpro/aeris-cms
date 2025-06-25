import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app_old/shared/form-group';

import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import { CreateProductInput } from '@/plugins/validators/create-product.schema';
import { categoryOption } from './form-utils';

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

export default function ProductStockAvailibility({
  className,
}: {
  className?: string;
}) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  const { stockAvailibility } = watch();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="Stock Availibility"
        description="Add your stock info here"
        className={cn(className)}
      >
        <Controller
          name="stockAvailibility"
          control={control}
          render={({ field }) => (
            <div>
              <Select
                {...field}
                options={[
                  { value: 'inStock', label: 'In Stock' },
                  { value: 'outOfStock', label: 'Out Of Stock' },
                  { value: 'callUs', label: 'Call Us' },
                  { value: 'endOfLife', label: 'End Of Life' },
                ]}
                label="Stock Availibility"
                className="col-span-full"
              />
            </div>
          )}
        />

        {stockAvailibility?.value === 'endOfLife' && (
          <Controller
            control={control}
            name="alternativeProduct"
            render={({ field }) => (
              <MultySelect
                {...field}
                options={categoryOption}
                label="Alternative Products"
                error={errors?.alternativeProduct?.message as string}
                dropdownClassName="h-auto"
              />
            )}
          />
        )}

        <div className="col-span-full flex gap-4">
          <Controller
            name="bestSeller"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div>
                <Checkbox
                  checked={value}
                  onChange={onChange}
                  label="Best Seller"
                  className="col-span-full"
                />
              </div>
            )}
          />

          <Controller
            name="backOrder"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div>
                <Checkbox
                  checked={value}
                  onChange={onChange}
                  label="Back Order"
                  className="col-span-full"
                />
              </div>
            )}
          />
        </div>
      </FormGroup>
    </div>
  );
}
