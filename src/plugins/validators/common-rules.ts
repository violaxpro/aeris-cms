import { z } from 'zod';
import { messages } from '@/config/messages';

export const fileSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.number(),
});

export const selectSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type FileSchema = z.infer<typeof fileSchema>;

export const validateEmail = z
  .string()
  .min(1, { message: messages.emailIsRequired })
  .email({ message: messages.invalidEmail });

export const validatePassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });

export const validateNewPassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });

export const validateConfirmPassword = z
  .string()
  .min(1, { message: messages.confirmPasswordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });

export const stripHTML = (html: string) => {
  return html.replace(/<[^>]+>/g, '');
};

export const roundNumber = (num: number) => Number(num.toFixed(2));
export const mathFloor = (num: number) => Math.floor(num * 100) / 100;

export const slugify = (text: string) => {
  return text
    .toLowerCase()             // lowercase semua
    .trim()                    // hapus spasi depan belakang
    .replace(/[^a-z0-9\s-]/g, '') // hapus karakter selain huruf, angka, spasi, dash
    .replace(/\s+/g, '-')      // spasi → dash
    .replace(/-+/g, '-');      // multi dash → 1 dash
};

export const mapTemplatesToOptions = (templates: any[]) => {
  return templates.map((t) => ({
    label: t.name,
    value: t.html_template,
  }));
};




