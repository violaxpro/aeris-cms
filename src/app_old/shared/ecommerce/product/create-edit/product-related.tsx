import { Controller, useFormContext } from 'react-hook-form';
import { Button, Checkbox, Input, Text, Textarea } from 'rizzui';
import cn from '@/core/utils/class-names';
import FormGroup from '@/app_old/shared/form-group';
import {
  categoryOption,
  supplierOption,
  typeOption,
} from '@/app_old/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import QuillLoader from '@/core/components/loader/quill-loader';
import ProductPricing from './product-pricing';
import { FiAlertCircle } from 'react-icons/fi';
import { CreateProductInput } from '@/plugins/validators/create-product.schema';
import CNumberInput from '@/core/ui/number-input';
import RelatedProductTable from './table-related-product/table';

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

export default function ProductRelateds({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="Related Products"
        description="Related Products information about the product."
        className={cn(className)}
      >
        <div className="relative col-span-full">
          <RelatedProductTable />
        </div>
        <div className="col-span-full flex justify-end">
          <Button>Save</Button>
        </div>
      </FormGroup>
    </div>
  );
}
