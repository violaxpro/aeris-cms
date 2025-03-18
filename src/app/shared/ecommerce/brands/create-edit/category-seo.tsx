import { Controller, useFormContext } from 'react-hook-form';
import { Button, Input, Text, Textarea } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import { CategoryFormInput } from '@/validators/create-category.schema';
import QuillLoader from '@/core/components/loader/quill-loader';
import { FiAlertCircle } from 'react-icons/fi';

const QuillEditor = dynamic(() => import('@/core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function CategorySeo({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<CategoryFormInput>();

  return (
    <>
      <FormGroup
        title="SEO"
        description="Seo for this category"
        className={cn(className)}
      >
        <Input
          type="url"
          placeholder="input url"
          label="URL"
          className="col-span-full"
          {...register('url')}
          error={errors.url?.message as string}
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
          control={control}
          name="pageDescription"
          render={({ field }) => (
            <div className="col-span-full">
              <QuillEditor
                {...field}
                label="Page Description"
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                error={errors.pageDescription?.message}
              />
              <Text>Hint: DON&apos;T USE H1 TAG ON DESCRIPTION</Text>
            </div>
          )}
        />

        <div className="col-span-full flex justify-end gap-4">
          <Button variant="outline" color="danger">
            Delete
          </Button>
          <Button>Save</Button>
        </div>
      </FormGroup>
    </>
  );
}
