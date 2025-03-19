'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';

import FormFooter from '@/core/components/form-footer';
import cn from '@/core/utils/class-names';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import BrandGeneral from './brand-general';
import BrandImages from './brand-images';
import BrandSeo from './brand-seo';
import {
  BrandFormInput,
  brandFormSchema,
} from '@/validators/create-brand.schema';

interface IndexProps {
  slug?: string;
  className?: string;
  brand?: BrandFormInput;
}

export default function CreateEditBrands({
  slug,
  brand,
  className,
}: IndexProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const methods = useForm<BrandFormInput>({
    resolver: zodResolver(brandFormSchema),
    // defaultValues: defaultValues(brand),
  });

  const onSubmit: SubmitHandler<BrandFormInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      toast.success(
        <Text as="b">Brand successfully {slug ? 'updated' : 'created'}</Text>
      );
      methods.reset();
      router.push(routes.eCommerce.brands);
    }, 600);
  };

  return (
    <div className="@container">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <BrandGeneral />
            <BrandImages />
            <BrandSeo />
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Brand' : 'Create Brand'}
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
