import { z } from 'zod';
import { messages } from '../../config/messages.ts';

export const fileSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.number(),
});

export type FileSchema = z.infer<typeof fileSchema>;

// Email validation
export const validateEmail = (t: (arg: string) => string) =>
  z
    .string()
    .min(1, { message: t(messages.emailIsRequired) })
    .email({ message: t(messages.invalidEmail) });

// Password validation (for signup/login)
export const validatePassword = (t: (arg: string) => string) =>
  z
    .string()
    .min(1, { message: t(messages.passwordRequired) })
    .min(6, { message: t(messages.passwordLengthMin) })
    .regex(new RegExp('.*[A-Z].*'), {
      message: t(messages.passwordOneUppercase),
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: t(messages.passwordOneLowercase),
    })
    .regex(new RegExp('.*\\d.*'), { message: t(messages.passwordOneNumeric) });

// For reset/change password (same rules as password)
export const validateNewPassword = (t: (arg: string) => string) =>
  validatePassword(t);

// Confirm password only checks required field.
// Matching with `password` will be handled in the schema with .refine()
export const validateConfirmPassword = (t: (arg: string) => string) =>
  z.string().min(1, { message: t(messages.confirmPasswordRequired) });
