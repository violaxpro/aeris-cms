import ProductPage from "@/features/pages/product"
import { getProduct } from '@/services/products-service'
import { getBrands } from "@/services/brands-service";
import { getCategories } from "@/services/category-service";

export default async function ProductPageRoute() {
  let products = [];

  try {
    const resProduct = await getProduct();

    if (resProduct?.data?.length > 0) {
      const categoriesIdArray = Array.from(new Set(resProduct.data.map((item: any) => item.categoriesId)));
      const resCategories = await Promise.all(categoriesIdArray.map((id: any) => getCategories(id)));
      const categories = resCategories.map((res: any) => res.data);

      const brandsIdArray = Array.from(new Set(resProduct.data.map((item: any) => item.brandId)));
      const resBrands = await Promise.all(brandsIdArray.map((id: any) => getBrands(id)));
      const brands = resBrands.map((res: any) => res.data);

      products = resProduct.data.map((product: any) => {
        const matchedCategory = categories.find(cat => cat.id === product.categoriesId);
        const matchedBrand = brands.find(brand => brand.id === product.brandId);
        return {
          ...product,
          category: matchedCategory || null,
          brand: matchedBrand || null,
        };
      });
    }

  } catch (error) {
    console.error('Fetch error:', error);
  }

  return (
    <ProductPage products={products} />
  );
}
