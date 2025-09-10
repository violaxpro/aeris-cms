import ProductsServices from '@/features/pages/catalogue/product-service'

export default async function ProductPageRoute({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}
) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "products";

  return (
    <ProductsServices tab={activeTab} />
  );
}
