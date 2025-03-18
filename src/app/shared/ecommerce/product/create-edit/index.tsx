'use client';

import { useEffect, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import {
  CreateProductInput,
  productFormSchema,
} from '@/validators/create-product.schema';
import SimpleBar from 'simplebar-react';
import TabPricing from './tab-pricing';
import TabBasic from './tab-basic';
import TabAdvanced from './tab-advanced';
import FormFooter from '@/core/components/form-footer';
import cn from '@/core/utils/class-names';

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateProductInput;
}

export const navItems = [
  {
    value: 'basic',
    label: 'Basic Information',
  },
  {
    value: 'pricing',
    label: 'Pricing',
  },
  {
    value: 'advanced',
    label: 'Advanced Information',
  },
];

export default function CreateEditProduct({
  slug,
  product,
  className,
}: IndexProps) {
  const [isLoading, setLoading] = useState(false);

  const [tab, setTab] = useState('basic');
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });

  const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      toast.success(
        <Text as="b">Product successfully {slug ? 'updated' : 'created'}</Text>
      );
      methods.reset();
    }, 600);
  };

  const handleNextStep = () => {
    if (tab === 'basic') {
      selectTab('pricing');
    } else if (tab === 'pricing') {
      selectTab('advanced');
    } else if (tab === 'advanced') {
      methods.handleSubmit(onSubmit)();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [tab]);

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
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {tab === 'basic' && <TabBasic />}
            {tab === 'pricing' && <TabPricing />}
            {tab === 'advanced' && <TabAdvanced />}
          </div>

          <FormFooter
            isLoading={isLoading}
            showExportBtn
            handleCreateBtn={handleNextStep}
            submitBtnText={slug ? 'Update Product' : 'Create Product'}
          />
        </form>
      </FormProvider>
    </div>
  );
}

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    value: string;
    label: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({
  item,
  isActive,
  onClick,
  ...props
}: TabButtonProps) {
  function handleClick() {
    return onClick();
  }

  return (
    <button
      className={cn(
        'relative flex items-center gap-2 py-2 text-sm outline-none',
        isActive
          ? 'font-medium text-gray-900'
          : 'text-gray-500 hover:text-gray-800'
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="whitespace-nowrap">{item.label}</span>
      <span
        className={cn(
          'absolute -bottom-px left-0 h-0.5 w-full',
          isActive ? 'bg-primary' : 'bg-transparent'
        )}
      />
    </button>
  );
}
