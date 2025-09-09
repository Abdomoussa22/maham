import { z } from 'zod';
import { messages } from '../../config/messages.ts';
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from './common.rules.ts';

// form zod validation schema
export const signUpSchema = (t: (arg: string) => string) =>
  z.object({
    firstName: z.string().min(1, { message: messages.firstNameRequired }),
    lastName: z.string().optional(),
    email: validateEmail(t),
    password: validatePassword(t),
    confirmPassword: validateConfirmPassword(t),
    isAgreed: z.boolean(),
  });

// generate form types from zod validation schema
export type SignUpSchema = z.infer<ReturnType<typeof signUpSchema>>;
