import SelectLoader from '@/core/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { Controller, useFormContext } from 'react-hook-form';
import { ActionIcon, Button, Input, NumberInput, Tooltip } from 'rizzui';
import { supplierOption } from './form-utils';
import FormGroup from '@/app/shared/form-group';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ModalPriceHistory from './modal-price-history/modal-price-history';
import CNumberInput from '@/core/ui/number-input';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function ProductPricing() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const { openModal } = useModal();

  return (
    <div className="flex flex-col gap-6">
      <FormGroup title="Price" description="Price information.">
        <Controller
          control={control}
          name="buyingPrice"
          render={({ field: { onChange, value } }) => (
            <CNumberInput
              label="Buying Price"
              placeholder="10"
              value={value}
              onChange={onChange}
              error={errors.buyingPrice?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="rrp"
          render={({ field }) => (
            <CNumberInput
              {...field}
              label="RRP"
              placeholder="$10"
              error={errors.rrp?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="trade"
          render={({ field }) => (
            <CNumberInput
              {...field}
              label="Trade"
              placeholder="$10"
              error={errors.trade?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="silver"
          render={({ field }) => (
            <CNumberInput
              {...field}
              label="Silver"
              placeholder="$10"
              error={errors.silver?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="gold"
          render={({ field }) => (
            <CNumberInput
              {...field}
              label="Gold"
              placeholder="$10"
              error={errors.gold?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="platinum"
          render={({ field }) => (
            <CNumberInput
              {...field}
              label="Platinum"
              placeholder="$10"
              error={errors.platinum?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="diamond"
          render={({ field }) => (
            <CNumberInput
              {...field}
              label="Diamond"
              placeholder="$10"
              error={errors.diamond?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="kitPrice"
          render={({ field }) => (
            <CNumberInput
              {...field}
              label="Kit Price"
              placeholder="$10"
              error={errors.kitPrice?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="priceNotes"
          render={({ field }) => (
            <CNumberInput
              {...field}
              label="Price Notes"
              placeholder="$10"
              error={errors.priceNotes?.message as string}
            />
          )}
        />
      </FormGroup>

      <div className="flex items-center justify-end gap-4 bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10">
        <Button
          className="w-full text-xs capitalize @lg:w-auto sm:text-sm"
          onClick={() =>
            openModal({
              view: <ModalPriceHistory />,
              customSize: '1080px',
            })
          }
        >
          View Price History
        </Button>
        <Button
          className="w-full text-xs capitalize @lg:w-auto sm:text-sm"
          onClick={() => {}}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
