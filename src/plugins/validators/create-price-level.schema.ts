import { z } from 'zod';
import { messages } from '@/config/messages';
import { selectSchema } from './common-rules';

export const priceLevelFormSchema = z.object({
  brand: z.string().min(1, { message: messages.brandIsRequired }),
  categories: z
    .array(z.string())
    .min(1, { message: messages.categoryIsRequired }),
  subCategories: z
    .array(z.string())
    .min(1, { message: messages.subCategoryIsRequired }),
  warranty: z.number().optional().default(0),
});

export type CreatePriceLevelInput = z.infer<typeof priceLevelFormSchema>;
