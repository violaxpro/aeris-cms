import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, selectSchema } from './common-rules';

export const productFormSchema = z.object({
  // Tab Basic
  // Section General
  name: z.string().min(1, { message: messages.productNameIsRequired }),
  description: z.string().optional(),
  metaTitle: z
    .string()
    .min(50, { message: messages.metaTitleIsShort })
    .max(65, {
      message: messages.metaTitleIsLong,
    }),
  metaDescription: z
    .string()
    .min(50, { message: messages.metaDescriptionIsShort })
    .max(65, { message: messages.metaDescriptionIsLong }),
  brand: z
    .string({ required_error: messages.brandIsRequired })
    .min(1, { message: messages.brandIsRequired }),
  categories: z
    .array(z.string())
    .min(1, { message: messages.categoryIsRequired }),
  taxClass: z.string().min(1, { message: messages.taxClassIsRequired }),
  tags: z.array(z.string()).min(1, { message: messages.tagsIsRequired }),
  manualUrl: z.string().url({ message: messages.manualUrlIsInvalid }),
  status: z.boolean().optional().default(false),
  warranty: z.number().optional().default(0),

  // Section Inventory
  sku: z.string(),
  sku2: z.string(),
  mpn: z.string(),
  inventoryManagement: z.string(),
  alternativeProduct: z.array(z.string()).optional(),
  stockAvailibility: selectSchema.optional(),
  bestSeller: z.boolean().optional(),
  backOrder: z.boolean().optional(),
  baseImage: z.array(fileSchema).optional(),
  additionalImages: z.array(fileSchema).optional(),

  // Tab Pricing
  buyPrice: z.number(),
  rrp: z.number(),
  trade: z.number(),
  silver: z.number(),
  gold: z.number(),
  platinum: z.number(),
  diamond: z.number(),
  kitPrice: z.number(),
  priceNotes: z.number(),
  supplier: z.array(
    z.object({
      supplierName: z.string({ message: messages.supplierNameIsRequired }),
      supplierExistingPrice: z.number(),
    })
  ),
  kitPriceProduct: z.array(
    z.object({
      kitPriceName: z.string(),
    })
  ),
  additionalShippingCost: z.number().optional(),

  // Tab Advanced
  // Attributes
  attributes: z.array(
    z.object({
      attribute: z.string(),
      values: z.array(z.string()),
    })
  ),

  // Options
  options: z.array(
    z.object({
      optionName: z.string(),
      optionType: z.string(),
      optionRequired: z.boolean(),
      globalOptions: z.array(
        z.object({
          optionName: z.string(),
        })
      ),
    })
  ),

  // Related Products
  // Upsell
  // Product kits
  // additional
});

export type CreateProductInput = z.infer<typeof productFormSchema>;
