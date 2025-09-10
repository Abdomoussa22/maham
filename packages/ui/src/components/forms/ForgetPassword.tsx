'use client';

import * as Yup from 'yup';
import { TextBoxFormik } from '../inputs/TextBoxFormik.tsx'; // ✅ your reusable textfield
import { FormikForm } from './formik-form.tsx'; // ✅ your reusable FormikForm

// ✅ Validation schema with Yup (similar to Zod)
const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function ForgetPasswordForm() {
  const onSubmit = async (values: typeof initialValues) => {
    console.log('Reset password values:', values);
    // 🔗 call API for reset password here
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <FormikForm
        initialValues={initialValues}
        validationSchema={ForgetPasswordSchema}
        onSubmit={onSubmit}
        submitText='Reset Password'
      >
        <TextBoxFormik
          name='email'
          type='email'
          label='Email'
          placeholder='Enter your email'
        />
        <TextBoxFormik
          name='password'
          type='password'
          label='Password'
          placeholder='Enter your new password'
        />
        <TextBoxFormik
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Re-enter your new password'
        />
      </FormikForm>

      {/* Bottom text with Sign In link */}
      <p className='mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base'>
        Don’t want to reset your password?{' '}
        <div className='font-bold text-gray-700 transition-colors hover:text-blue'>
          Sign In
        </div>
      </p>
    </div>
  );
}
