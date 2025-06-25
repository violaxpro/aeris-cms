import SelectLoader from '@/core/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app_old/shared/form-group';
import { CreateProductInput } from '@/plugins/validators/create-product.schema';
import CNumberInput from '@/core/ui/number-input';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function ProductShipping() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="Additional Shipping Cost"
        description="Additional Shipping Cost."
      >
        <Controller
          control={control}
          name="additionalShippingCost"
          render={({ field: { onChange, value } }) => (
            <CNumberInput
              label="Additional Shipping Cost"
              placeholder="10"
              value={value ?? 0}
              onChange={onChange}
              error={errors.additionalShippingCost?.message as string}
            />
          )}
        />
      </FormGroup>
    </div>
  );
}
