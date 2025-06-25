import ProductAttribute from './product-attribute';
import ProductOptions from './product-options';
import ProductRelateds from './product-related';

export default function TabAdvanced() {
  return (
    <div className="mt-6 flex flex-col gap-6 divide-y divide-dashed divide-gray-200">
      <ProductAttribute />
      <ProductOptions />
      <ProductRelateds />
    </div>
  );
}
