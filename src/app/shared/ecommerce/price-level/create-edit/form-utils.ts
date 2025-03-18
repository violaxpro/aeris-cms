import { CreatePriceLevelInput } from '@/validators/create-price-level.schema';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export const priceLevelDefaultValues: CreatePriceLevelInput = {
  brand: '',
  categories: [],
  subCategories: [],
  warranty: 0,
};

export const priceLevelData: CreatePriceLevelInput = {
  brand: 'digital product',
  categories: ['fruits'],
  subCategories: ['meat'],
  warranty: 0,
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'grocery',
    label: 'Grocery',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'cat food',
    label: 'Cat Food',
  },
];

// Type option
export const typeOption = [
  {
    value: 'digital product',
    label: 'Digital Product',
  },
  {
    value: 'physical product',
    label: 'Physical Product',
  },
];

export const supplierOption = [
  {
    value: 'supplier1',
    label: 'Supplier 1',
  },
  {
    value: 'supplier2',
    label: 'Supplier 2',
  },
  {
    value: 'supplier3',
    label: 'Supplier 3',
  },
  {
    value: 'supplier4',
    label: 'Supplier 4',
  },
  {
    value: 'supplier5',
    label: 'Supplier 5',
  },
];

// Variant option
export const variantOption = [
  {
    value: 'single',
    label: 'Single',
  },
  {
    value: 'multiple',
    label: 'Multiple',
  },
];

export const typeOptions = [
  {
    value: 'field',
    label: 'Text Field',
  },
  {
    value: 'textarea',
    label: 'Text Area',
  },

  {
    value: 'dropdown',
    label: 'Dropdown',
  },
  {
    value: 'checkbox',
    label: 'Checkbox',
  },
  {
    value: 'customCheckbox',
    label: 'Custom Checkbox',
  },
  { value: 'radio', label: 'Radio' },
  { value: 'customRadio', label: 'Custom Radio' },
  { value: 'mulipleSelect', label: 'Multiple Select' },
  {
    value: 'date',
    label: 'Date',
  },
  {
    value: 'time',
    label: 'Time',
  },
  {
    value: 'datetime',
    label: 'Date & Time',
  },
];

export const globalTypeOptions = [
  {
    value: 'field',
    label: 'Text Field',
  },
  {
    value: 'textarea',
    label: 'Text Area',
  },
  {
    value: 'checkbox',
    label: 'Checkbox',
  },
  {
    value: 'customCheckbox',
    label: 'Custom Checkbox',
  },
  { value: 'radio', label: 'Radio' },
  { value: 'customRadio', label: 'Custom Radio' },
];
