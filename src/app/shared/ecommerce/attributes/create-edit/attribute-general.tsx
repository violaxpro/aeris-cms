import { Controller, useFormContext } from 'react-hook-form';
import { ActionIcon, Button, Flex, Input, SelectOption } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app/shared/form-group';

import dynamic from 'next/dynamic';
import { AttributeFormInput } from '@/validators/create-attribute.schema';
import CSelect from '@/core/ui/select';
import { typeOption } from './form-utils';
import CCheckbox from '@/core/ui/checkbox';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useAtom } from 'jotai';
import { attributeSetAtom } from '@/store/attributeSet';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);

export default function AttributeGeneral({
  className,
}: {
  className?: string;
}) {
  const { openModal } = useModal();

  const [attributeSetOptions] = useAtom(attributeSetAtom);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AttributeFormInput>();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="General"
        description="General information about the attribute."
        className={cn(className)}
      >
        <Input
          label="Name"
          placeholder="Name"
          {...register('name')}
          error={errors.name?.message as string}
        />

        <Controller
          name="attributeSet"
          control={control}
          render={({ field }) => (
            <Flex gap="1">
              <CSelect
                {...field}
                clearable
                onClear={() => field.onChange('')}
                label="Attribute Set"
                placeholder="Select Attribute Set"
                options={attributeSetOptions as SelectOption[]}
                error={errors.attributeSet?.message as string}
              />
              <ActionIcon
                onClick={() =>
                  openModal({
                    view: <ModalAddNewAttributeSet />,
                  })
                }
                className="mt-7 shrink-0"
                variant="solid"
              >
                <PiPlus className="h-4 w-4" />
              </ActionIcon>
            </Flex>
          )}
        />

        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <MultySelect
              {...field}
              clearable
              onClear={() => field.onChange([])}
              label="Categories"
              placeholder="Select Categories"
              options={typeOption}
              error={errors.categories?.message as string}
            />
          )}
        />

        <Controller
          name="filterable"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CCheckbox
              label="Filterable"
              checkBoxLabel="Check this to enable this attribute"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </FormGroup>
    </div>
  );
}

import { Description, Field, Label, Select } from '@headlessui/react';
import clsx from 'clsx';
import { BsChevronBarDown } from 'react-icons/bs';
import { PiPlus } from 'react-icons/pi';
import ModalAddNewAttributeSet from '../modal-attribute-set';
import SelectLoader from '@/core/components/loader/select-loader';

function CustomSelect() {
  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Label className="text-sm/6 font-medium text-white">
          Project status
        </Label>
        <Description className="text-sm/6 text-white/50">
          This will be visible to clients on the project.
        </Description>
        <div className="relative">
          <Select className={'w-full'}>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option>
          </Select>
          <BsChevronBarDown
            className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
}
