import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

// form zod validation schema
export const categoryFormSchema = z.object({
  // Tab 1 General
  categories: z.string().min(1, { message: messages.nameIsRequired }),
  subCategory: z.string().optional(),
  name: z.string().min(1, { message: messages.nameIsRequired }),
  searchable: z.boolean().optional().default(false),
  showOnCategoryPage: z.boolean().optional().default(false),
  status: z.boolean().optional().default(false),
  logo: fileSchema.optional(),
  banner: fileSchema.optional(),

  // Tab 2 SEO
  url: z
    .string()
    .url(messages.urlIsInvalid)
    .min(1, { message: messages.urlIsRequired }),
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
  pageDescription: z.string({ message: messages.pageDescriptionIsRequired }),
});

// generate form types from zod validation schema
export type CategoryFormInput = z.infer<typeof categoryFormSchema>;
