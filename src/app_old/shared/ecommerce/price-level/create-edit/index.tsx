'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import FormFooter from '@/core/components/form-footer';
import cn from '@/core/utils/class-names';
import PriceLevelForm from './price-level-form';
import {
  CreatePriceLevelInput,
  priceLevelFormSchema,
} from '@/plugins/validators/create-price-level.schema';
import { priceLevelData, priceLevelDefaultValues } from './form-utils';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

interface IndexProps {
  slug?: string;
  className?: string;
}

export default function CreateEditPriceLevel({ slug, className }: IndexProps) {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const methods = useForm<CreatePriceLevelInput>({
    resolver: zodResolver(priceLevelFormSchema),
    defaultValues: slug ? priceLevelData : priceLevelDefaultValues,
  });

  const onSubmit: SubmitHandler<CreatePriceLevelInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('price_level_data', data);
      toast.success(
        <Text as="b">
          Price Level successfully {slug ? 'updated' : 'created'}
        </Text>
      );
      methods.reset();
      router.push(routes.eCommerce.priceLevel);
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
            <PriceLevelForm />
          </div>

          <FormFooter
            isLoading={isLoading}
            showExportBtn
            submitBtnText={slug ? 'Update Price Level' : 'Create Price Level'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
