import { Controller, useFormContext } from 'react-hook-form';
import { Button, Checkbox, Input, Text, Textarea } from 'rizzui';
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

export default function ProductGeneral({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  return (
    <>
      <FormGroup
        title="General"
        description="General information about the product."
        className={cn(className)}
      >
        <Input
          label="Name"
          placeholder="Product Name"
          {...register('name')}
          error={errors.name?.message as string}
        />

        <Controller
          name="brand"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              dropdownClassName="h-auto"
              options={typeOption}
              value={value}
              onChange={onChange}
              label="Brand"
              error={errors?.brand?.message as string}
              getOptionValue={(option) => option.value}
            />
          )}
        />

        <Controller
          name="categories"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultySelect
              options={categoryOption}
              value={value}
              onChange={onChange}
              label="Categories"
              error={errors?.categories?.message as string}
              dropdownClassName="h-auto"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <QuillEditor
              value={value}
              onChange={onChange}
              label="Description"
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          )}
        />

        <Input
          className="col-span-full"
          label="Meta Title"
          placeholder="meta Title"
          {...register('metaTitle')}
          error={errors.metaTitle?.message as string}
          suffix={
            <FiAlertCircle
              color={errors.metaTitle?.message ? 'red' : 'green'}
            />
          }
          helperText={
            <Text className="text-sm text-gray-500">
              min. 50 / max. 65, Characters: {watch('metaTitle')?.length || 0}
            </Text>
          }
        />

        <Textarea
          className="col-span-full"
          label="Meta Description"
          placeholder="meta description"
          {...register('metaDescription')}
          error={errors.metaDescription?.message as string}
          helperText={
            <Text className="text-sm text-gray-500">
              min. 50 / max. 65, Characters:{' '}
              {watch('metaDescription')?.length || 0}
            </Text>
          }
        />

        <Controller
          name="taxClass"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              options={typeOption}
              value={value}
              onChange={onChange}
              label="Tax Class"
              error={errors?.taxClass?.message as string}
              getOptionValue={(option) => option.value}
            />
          )}
        />

        <Controller
          name="tags"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultySelect
              options={categoryOption}
              value={value}
              onChange={onChange}
              label="Tags"
              error={errors?.tags?.message as string}
              dropdownClassName="h-auto"
            />
          )}
        />

        <Input
          label="Manual URL"
          placeholder="Manual URL"
          {...register('manualUrl')}
          error={errors.manualUrl?.message as string}
        />

        <Controller
          control={control}
          name="warranty"
          render={({ field }) => (
            <CNumberInput label="Warranty" placeholder="mounth" {...field} />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div>
              <Text fontWeight="semibold" className="mb-[6px]">
                Status
              </Text>
              <Checkbox
                checked={value}
                onChange={onChange}
                label="Check this to enable this product"
                className="col-span-full"
              />
            </div>
          )}
        />
        <div className="col-span-full flex justify-end">
          <Button>Save</Button>
        </div>
      </FormGroup>
    </>
  );
}
