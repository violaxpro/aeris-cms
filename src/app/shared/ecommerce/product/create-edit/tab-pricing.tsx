import ProductKitPrice from './product-kit-price';
import ProductPricing from './product-pricing';
import ProductShipping from './product-shipping';
import ProductSupplier from './product-supplier';

export default function TabPricing({}: {}) {
  return (
    <div className="mt-6 flex flex-col gap-6 divide-y divide-dashed divide-gray-200">
      <ProductPricing />
      <ProductSupplier />
      <ProductKitPrice />
      <ProductShipping />
    </div>
  );
}
