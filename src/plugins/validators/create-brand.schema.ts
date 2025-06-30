import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

// form zod validation schema
export const brandFormSchema = z.object({
  // Section 1
  name: z.string().min(1, { message: messages.nameIsRequired }),
  discount: z.number(),
  status: z.boolean().optional().default(false),

  // Section 2
  logo: fileSchema.optional(),
  banner: fileSchema.optional(),

  // Section 3
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
});

// generate form types from zod validation schema
export type BrandFormInput = z.infer<typeof brandFormSchema>;
