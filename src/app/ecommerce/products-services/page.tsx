import ProductsServices from '@/features/pages/catalogue/product-service'
import { getProduct } from '@/services/products-service'

export default async function ProductPageRoute() {
  let productsServices = { data: [], page: 1, perPage: 10, count: 0 };

  try {
    productsServices = await getProduct({ page: 1, perPage: 10 });
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return (
    <ProductsServices productServiceDatas={productsServices} />
  );
}
