'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Text } from 'rizzui';
import { signUpSchema } from '../../utils/validators/signup.schema.ts';
import { FormikForm } from '../forms/formik-form'; // ✅ using your wrapper
import { TextBoxFormik } from '../inputs/TextBoxFormik';
import { CheckboxFormik } from '../inputs/checkbox-formik';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAgreed: false,
};

export default function SignUpForm() {
  const [reset, setReset] = useState(false);

  const handleSubmit = async (values: typeof initialValues) => {
    console.log('Signup data:', values);

    // Simulate API signup call
    await new Promise(res => setTimeout(res, 1000));

    // Reset form
    setReset(true);
  };

  return (
    <>
      <FormikForm
        initialValues={initialValues}
        validationSchema={signUpSchema(msg => msg)} // ✅ pass t function or direct msg
        onSubmit={handleSubmit}
        onReset={() => setReset(false)}
        submitText='Get Started'
        resetText='Clear'
      >
        {/* Fields */}
        <div className='flex flex-col gap-y-5'>
          {/* First Name & Last Name Row */}
          <div className='grid grid-cols-2 gap-x-4'>
            <TextBoxFormik
              name='firstName'
              type='text'
              label='First Name'
              placeholder='Enter your first name'
            />
            <TextBoxFormik
              name='lastName'
              type='text'
              label='Last Name'
              placeholder='Enter your last name'
            />
          </div>

          {/* Email, Password, Confirm Password */}
          <div className='flex flex-col gap-y-5'>
            <TextBoxFormik
              name='email'
              type='email'
              label='Email'
              placeholder='Enter your email'
            />

            <div className='grid grid-cols-2 gap-x-4'>
              <TextBoxFormik
                name='password'
                type='password'
                label='Password'
                placeholder='Enter your password'
              />
              <TextBoxFormik
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                placeholder='Enter confirm password'
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className='flex items-start'>
            <CheckboxFormik
              name='isAgreed'
              label={
                <div className='text-nowrap'>
                  {'By signing up you have agreed to our '}{' '}
                  <Link href='/' className='underline text-blue-600'>
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link href='/' className='underline text-blue-600'>
                    Privacy Policy
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      </FormikForm>

      {/* Already have account link */}
      <Text className='mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start'>
        {'Don’t have an account?'}{' '}
        <Link
          href='/auth/login'
          className='font-semibold text-gray-700 transition-colors hover:text-blue'
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
