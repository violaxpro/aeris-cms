import ProductsServices from '@/features/pages/catalogue/product-service'
import { getProduct } from '@/services/products-service'
import { getServices } from '@/services/services-service';

export default async function ProductPageRoute() {
  let products = { data: [], page: 1, perPage: 10, count: 0 };
  let services = { data: [], page: 1, perPage: 10, count: 0 };

  try {
    products = await getProduct({ page: 1, perPage: 10 });
    services = await getServices({ page: 1, perPage: 10 });
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return (
    <ProductsServices products={products} services={services} />
  );
}
