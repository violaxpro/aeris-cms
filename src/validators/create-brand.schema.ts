import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

// form zod validation schema
export const brandFormSchema = z.object({
  // Section 1
});

// generate form types from zod validation schema
export type BrandFormInput = z.infer<typeof brandFormSchema>;
