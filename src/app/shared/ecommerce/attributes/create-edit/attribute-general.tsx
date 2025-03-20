import { Controller, useFormContext } from 'react-hook-form';
import { ActionIcon, Button, Flex, Input, SelectOption, Text } from 'rizzui';
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
import { Fragment, useEffect, useState } from 'react';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { BsCheck, BsChevronBarDown } from 'react-icons/bs';
import ModalAddNewAttributeSet from '../modal-attribute-set';
import { PiPlus } from 'react-icons/pi';
import SelectLoader from '@/core/components/loader/select-loader';
import { FiChevronDown } from 'react-icons/fi';

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

        <Controller
          name="attributeSet"
          control={control}
          render={({ field }) => (
            <Example
              {...field}
              placeholder="Select Attribute Set"
              label="Attribute Set"
              options={people}
            />
          )}
        />
      </FormGroup>
    </div>
  );
}

const people = [
  { label: 'Wade Cooper', value: 'wade' },
  { label: 'Arlene Mccoy', value: 'arlene' },
  { label: 'Devon Webb', value: 'devon' },
  { label: 'Tom Cook', value: 'tom' },
  { label: 'Tanya Fox', value: 'tanya' },
  { label: 'Hellen Schmidt', value: 'hellen' },
];

interface IProps {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
}

function Example({
  placeholder = 'Select',
  label,
  value,
  onChange,
  options,
}: IProps) {
  const [selected, setSelected] = useState({ label: '', value: '' });

  useEffect(() => {}, [value]);

  return (
    <div className="rizzui-select-root grid w-full grid-cols-1">
      <Text className="rizzui-select-label mb-1.5 block text-sm font-medium">
        {label}
      </Text>
      <Listbox
        value={selected}
        onChange={(item) => {
          console.log('🚀 ~ item:', item);
          setSelected(item);
          onChange?.(item.value);
        }}
      >
        <ListboxButton className="rizzui-multi-select-button peer flex min-h-10 w-full items-center rounded-md border border-muted bg-transparent px-3 py-2 pe-2.5 text-sm ring-[0.6px] ring-muted transition duration-200 hover:border-primary hover:ring-primary focus:border-primary focus:ring-[0.8px] focus:ring-primary">
          {selected.value ? (
            <span className="rizzui-select-value block w-full truncate pe-2.5 text-left rtl:text-right">
              {selected?.label}
            </span>
          ) : (
            <span className="rizzui-select-value block w-full truncate pe-2.5 text-left text-gray-400 rtl:text-right">
              {placeholder}
            </span>
          )}
          <span className="rizzui-select-suffix whitespace-nowrap leading-normal transition-transform duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </span>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="rizzui-select-options z-[999] m-0 h-auto w-[var(--button-width)] cursor-pointer overflow-auto rounded-md border border-muted bg-background !p-1.5 !outline-none !ring-0 drop-shadow [--anchor-max-height:256px;] [-ms-overflow-style:none] [scrollbar-color:rgba(0,0,0,0.2)_rgba(0,0,0,0)] [scrollbar-width:thin] focus-visible:outline-none dark:bg-muted/80 dark:backdrop-blur-3xl [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:shadow-none [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:bg-transparent [&>li]:!m-0"
        >
          {options?.map((item, idx) => (
            <ListboxOption
              key={idx}
              className={({ selected }) =>
                `rizzui-select-option flex w-full cursor-pointer items-center rounded-[4px] px-3 py-1.5 text-sm hover:bg-muted/70 ${
                  selected ? 'bg-muted/70' : ''
                }`
              }
              value={item}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </ListboxOption>
          ))}
          <ListboxOption
            className={() =>
              `rizzui-select-option flex w-full cursor-pointer items-center rounded-[4px] px-3 py-1.5 text-sm hover:bg-muted/70`
            }
            value={null}
          >
            {() => <Button>Add New</Button>}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
