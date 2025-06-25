import { useFormContext } from 'react-hook-form';
import { Input, Text, Textarea } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app_old/shared/form-group';
import dynamic from 'next/dynamic';
import QuillLoader from '@/core/components/loader/quill-loader';
import { FiAlertCircle } from 'react-icons/fi';
import { BrandFormInput } from '@/plugins/validators/create-brand.schema';

export default function BrandSeo({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<BrandFormInput>();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="SEO"
        description="Seo for this category"
        className={cn(className)}
      >
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
      </FormGroup>
    </div>
  );
}
