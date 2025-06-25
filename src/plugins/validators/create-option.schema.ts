import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

// form zod validation schema
export const optionFormSchema = z.object({
  // Tab 1
  // Section General
  name: z.string().min(1, { message: messages.nameIsRequired }),
  optionType: z.string().min(1, { message: messages.optionIsRequired }),
  required: z.boolean().optional().default(false),

  // Tab 2
  // Section Values
  values: z
    .array(
      z.object({
        value: z.string().min(1, { message: messages.valueIsRequired }),
      })
    )
    .min(1, { message: messages.valueIsRequired }),
});

// generate form types from zod validation schema
export type OptionFormInput = z.infer<typeof optionFormSchema>;
