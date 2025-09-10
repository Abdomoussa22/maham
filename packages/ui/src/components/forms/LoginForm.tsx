'use client';

import { Form, Formik } from './formik-form.tsx';
import * as Yup from 'yup';
import { Button1 } from '../buttons/button';
import { TextBoxFormik } from '../inputs/TextBoxFormik';

export default function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '', remember: false }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too short').required('Required'),
      })}
      onSubmit={values => {
        console.log('[LoginForm] Submitted:', values);
      }}
    >
      {() => (
        <Form className='space-y-4'>
          {/* Email */}
          <TextBoxFormik
            name='email'
            label='Email'
            type='email'
            placeholder='admin@admin.com'
          />

          {/* Password */}
          <TextBoxFormik
            name='password'
            label='Password'
            type='password'
            placeholder='••••••'
          />

          {/* Remember + Forgot */}
          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                name='remember'
                className='rounded border-gray-300'
              />
              Remember Me
            </label>
            <a
              href='/auth/forgot-password'
              className='text-blue-600 hover:underline'
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <Button1 type='submit' className='w-full'>
            Sign in →
          </Button1>

          {/* Sign up link */}
          <p className='text-sm text-gray-500 text-center mt-3'>
            Don’t have an account?{' '}
            <a
              href='/auth/signup'
              className='text-blue-600 font-medium hover:underline'
            >
              Sign Up
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
}
