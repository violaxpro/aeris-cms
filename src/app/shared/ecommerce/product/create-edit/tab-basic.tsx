import ProductGeneral from './product-general';
import ProductImages from './product-images';
import ProductInventory from './product-inventory';
import ProductStockAvailibility from './product-stock-availibility';

export default function TabBasic({}: {}) {
  return (
    <div className="mt-6 flex flex-col gap-6 divide-y divide-dashed divide-gray-200">
      <ProductGeneral />
      <ProductInventory />
      <ProductStockAvailibility />
      <ProductImages />
    </div>
  );
}
