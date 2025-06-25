import { Controller, useFormContext } from 'react-hook-form';
import { Button, Checkbox, FieldError, Input, Text, Textarea } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app_old/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app_old/shared/ecommerce/product/create-edit/form-utils';
import CSelect from '@/core/ui/select';
import { CategoryFormInput } from '@/plugins/validators/create-category.schema';
import UploadZone from '@/core/ui/file-upload/upload-zone';

export default function ProductGeneral({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<CategoryFormInput>();

  const { categories } = watch();

  return (
    <>
      <FormGroup
        title="General"
        description="General information about the product."
        className={cn(className)}
      >
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <CSelect
              {...field}
              placeholder="Select a Category"
              options={typeOption}
              label="Category"
              error={errors?.categories?.message as string}
            />
          )}
        />

        {categories === 'digital product' && (
          <Controller
            name="subCategory"
            control={control}
            render={({ field }) => (
              <CSelect
                {...field}
                options={categoryOption}
                label="Sub Categories"
                placeholder="Select a Sub Category"
                error={errors?.subCategory?.message as string}
              />
            )}
          />
        )}

        <Input
          label="Name"
          placeholder="Name"
          {...register('name')}
          error={errors.name?.message as string}
        />

        <Controller
          name="searchable"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div>
              <Text fontWeight="semibold" className="mb-[6px]">
                Searchable
              </Text>
              <Checkbox
                checked={value}
                onChange={onChange}
                label="Check this to make this category searchable"
                className="col-span-full"
              />
            </div>
          )}
        />

        <Controller
          name="showOnCategoryPage"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div>
              <Text fontWeight="semibold" className="mb-[6px]">
                Show On Category Page
              </Text>
              <Checkbox
                checked={value}
                onChange={onChange}
                label="Check this to show this category"
                className="col-span-full"
              />
            </div>
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
                label="Check this to enable this category"
                className="col-span-full"
              />
            </div>
          )}
        />
      </FormGroup>

      <div className="flex flex-col gap-6 pt-6">
        <FormGroup title="Images" description="Add your category images here">
          <div className="">
            <UploadZone
              name="logo"
              label="Logo Image"
              getValues={getValues}
              setValue={setValue}
            />
            <FieldError error={errors.logo?.message as string} />
          </div>

          <div className="">
            <UploadZone
              name="banner"
              label="Banner Image"
              getValues={getValues}
              setValue={setValue}
            />
            <FieldError error={errors.banner?.message as string} />
          </div>
        </FormGroup>
      </div>
    </>
  );
}
