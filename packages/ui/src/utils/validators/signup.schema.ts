import { z } from 'zod';
import { messages } from '../../config/messages.ts';
import { validateEmail, validatePassword } from './common.rules.ts';

// form zod validation schema
export const signUpSchema = (t: (arg: string) => string) =>
  z
    .object({
      firstName: z.string().min(1, { message: t(messages.firstNameRequired) }),
      lastName: z.string().min(1, { message: t(messages.lastNameRequired) }),
      email: validateEmail(t),
      password: validatePassword(t),
      confirmPassword: z
        .string()
        .min(1, { message: t(messages.confirmPasswordRequired) }),
      isAgreed: z.boolean().refine(val => val === true, {
        message: t(messages.isAgreedRequired),
      }),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t(messages.passwordsDidNotMatch),
    });

// generate form types from zod validation schema
export type SignUpSchema = z.infer<ReturnType<typeof signUpSchema>>;
