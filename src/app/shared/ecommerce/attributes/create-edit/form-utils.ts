import { CreateProductInput } from '@/validators/create-product.schema';
import isEmpty from 'lodash/isEmpty';

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

export function defaultValues(product?: CreateProductInput) {
  return {
    name: product?.name ?? '',
    brand: product?.brand ?? '',
    categories: product?.categories ?? [],
    description: product?.description ?? '',
    metaTitle: product?.metaTitle ?? '',
    metaDescription: product?.metaDescription ?? '',
    manualUrl: product?.manualUrl ?? '',
    supplier: product?.supplier ?? [],

    tags: product?.tags ?? [],
  };
}

export const productData: CreateProductInput = {
  name: 'test',
  brand: 'digital product',
  categories: ['fruits'],
  description: 'tessss desc',
  metaTitle: 'meta title meta title meta title meta title meta title',
  metaDescription: 'meta desc meta desc meta desc meta desc meta desc',
  manualUrl: 'www.google.com',
  supplier: [],

  tags: [],
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
