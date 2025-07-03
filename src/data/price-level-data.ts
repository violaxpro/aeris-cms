export type PriceLevelType = {
  id?: number | string | undefined
  name?: string
  brandId: string;
  categoryId: string;
  subcategoryId?: string;
  rrp_price: number | string;
  trade_price: number | string;
  silver_price: number | string;
  gold_price: number | string;
  platinum_price: number | string;
  diamond_price: number | string;
  kitPrice?: string;
  priceNotes?: string;
};

export type PriceLevelProps = {
  id: string;
  name: string;
  brand: string;
  categories: string;
  subcategories: string;
  stock: number;
  warranty: string;
};

export const priceLevelsData: PriceLevelProps[] = [
  {
    id: '1',
    name: 'Price Level 1',
    brand: 'Brand 1',
    categories: 'Category 1',
    subcategories: 'Subcategory 1',
    stock: 10,
    warranty: '1 year',
  },
  {
    id: '2',
    name: 'Price Level 2',
    brand: 'Brand 2',
    categories: 'Category 2',
    subcategories: 'Subcategory 2',
    stock: 20,
    warranty: '2 years',
  },
  {
    id: '3',
    name: 'Price Level 3',
    brand: 'Brand 3',
    categories: 'Category 3',
    subcategories: 'Subcategory 3',
    stock: 30,
    warranty: '3 years',
  },
  {
    id: '4',
    name: 'Price Level 4',
    brand: 'Brand 4',
    categories: 'Category 4',
    subcategories: 'Subcategory 4',
    stock: 40,
    warranty: '4 years',
  },
  {
    id: '5',
    name: 'Price Level 5',
    brand: 'Brand 5',
    categories: 'Category 5',
    subcategories: 'Subcategory 5',
    stock: 50,
    warranty: '5 years',
  },
  {
    id: '6',
    name: 'Price Level 6',
    brand: 'Brand 6',
    categories: 'Category 6',
    subcategories: 'Subcategory 6',
    stock: 60,
    warranty: '6 years',
  },
  {
    id: '7',
    name: 'Price Level 7',
    brand: 'Brand 7',
    categories: 'Category 7',
    subcategories: 'Subcategory 7',
    stock: 70,
    warranty: '7 years',
  },
  {
    id: '8',
    name: 'Price Level 8',
    brand: 'Brand 8',
    categories: 'Category 8',
    subcategories: 'Subcategory 8',
    stock: 80,
    warranty: '8 years',
  },
  {
    id: '9',
    name: 'Price Level 9',
    brand: 'Brand 9',
    categories: 'Category 9',
    subcategories: 'Subcategory 9',
    stock: 90,
    warranty: '9 years',
  },
  {
    id: '10',
    name: 'Price Level 10',
    brand: 'Brand 10',
    categories: 'Category 10',
    subcategories: 'Subcategory 10',
    stock: 100,
    warranty: '10 years',
  },
];
