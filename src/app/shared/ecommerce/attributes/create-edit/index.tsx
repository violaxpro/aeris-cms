'use client';

import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';

import FormFooter from '@/core/components/form-footer';
import cn from '@/core/utils/class-names';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import AttributeGeneral from './attribute-general';
import AttributeValues from './attribute-values';
import {
  AttributeFormInput,
  attributeFormSchema,
} from '@/validators/create-attribute.schema';
import SimpleBar from 'simplebar-react';
import { TabButton } from '@/app/shared/tab-button';

interface IndexProps {
  slug?: string;
  className?: string;
}

export const navItems = [
  {
    value: 'general',
    label: 'General Information',
  },
  {
    value: 'values',
    label: 'Values',
  },
];

export default function CreateEditAttributes({ slug, className }: IndexProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [tab, setTab] = useState('general');
  const [isPending, startTransition] = useTransition();

  const methods = useForm<AttributeFormInput>({
    resolver: zodResolver(attributeFormSchema),
    // defaultValues: defaultValues(brand),
  });

  console.log(methods.formState.errors);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const handleNextStep = () => {
    if (tab === 'general') {
      selectTab('values');
    } else if (tab === 'values') {
      methods.handleSubmit(onSubmit)();
    }
  };

  const onSubmit: SubmitHandler<AttributeFormInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      toast.success(
        <Text as="b">
          Attribute successfully {slug ? 'updated' : 'created'}
        </Text>
      );
      methods.reset();
      router.push(routes.eCommerce.attributes);
    }, 600);
  };

  return (
    <div className="@container">
      <SimpleBar>
        <nav className="flex items-center gap-5 border-b border-gray-300">
          {navItems.map((nav) => (
            <TabButton
              item={nav}
              key={nav.value}
              isActive={tab === nav.value}
              onClick={() => selectTab(nav.value)}
              disabled={isPending}
            />
          ))}
        </nav>
      </SimpleBar>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {tab === 'general' && <AttributeGeneral />}
            {tab === 'values' && <AttributeValues />}
          </div>

          <FormFooter
            handleCreateBtn={handleNextStep}
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Attributes' : 'Create Attributes'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
