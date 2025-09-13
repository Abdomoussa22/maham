'use client';

import { useEffect, useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import * as Yup from 'yup';
import { generateQrcode, loginApi } from '../../../../Api/index.ts';
import { Button } from '../button.tsx';
import { TextBoxFormik } from '../inputs/TextBoxFormik';
import { CheckboxFormik } from '../inputs/checkbox-formik.tsx'; // ✅ correct spelling
import { FormikForm } from './formik-form.tsx'; // ✅ use your wrapper
export default function LoginForm() {
  const [captchaImg, setCaptchaImg] = useState<string | null>(null);
  const [captchaUuid, setCaptchaUuid] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // Fetch captcha from API
  const fetchCaptcha = async () => {
    try {
      setLoading(true);

      const { data } = await generateQrcode();
      console.log('captcha image data', data);
      console.log(`data:image/png;base64,${data.img}`);
      setCaptchaImg(`data:image/jpeg;base64,${data.img}`);
      setCaptchaUuid(data.uuid);

      // if (data?.code === 200 && data?.img) {
      //   setCaptchaUuid(data.data.uuid);
      // }
    } catch (err) {
      console.error('❌ Error fetching captcha:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  console.log('captcha image', captchaImg);

  return (
    <FormikForm
      initialValues={{
        username: '',
        password: '',
        remember: false,
        captcha: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(4, 'Too short').required('Required'),
        captcha: Yup.string().required('Enter captcha'),
      })}
      onSubmit={async values => {
        try {
          const payload = {
            username: values.username,
            password: values.password,
            code: values.captcha,
            uuid: captchaUuid,
            loginIP: window.location.hostname,
            clientId: crypto.randomUUID(),
            tenantId: '',
          };

          console.log('Login payload:', payload);

          const res = await loginApi(payload);
          alert(res.msg);
          console.log('✅ Login success:', res);
        } catch (error) {
          console.error('❌ Login error:', error);
        }
      }}
    >
      {/* Email */}
      <TextBoxFormik
        name='username'
        label='username'
        type='text'
        placeholder='Admin'
      />
      {/* Password */}
      <TextBoxFormik
        name='password'
        label='Password'
        type='password'
        placeholder='••••••'
      />
      {/* Captcha */}
      <div>
        <div className='flex items-center gap-4 mb-2'>
          {captchaImg ? (
            <img
              src={captchaImg}
              alt='Captcha'
              onClick={fetchCaptcha}
              className='cursor-pointer border rounded-lg'
            />
          ) : (
            <div className='text-sm text-gray-500'>
              {loading ? (
                <>
                  <div className='w-[150px] h-[50px] flex items-center justify-center border rounded-lg bg-gray-100'>
                    <svg
                      className='animate-spin h-6 w-6 text-blue-600'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                      ></path>
                    </svg>
                  </div>
                </>
              ) : (
                <p className='text-sm text-gray-500'>Click to reload captcha</p>
              )}
            </div>
          )}
          <button
            type='button'
            onClick={fetchCaptcha}
            className='text-xs text-blue-600 hover:underline'
          >
            Refresh
          </button>
        </div>

        <TextBoxFormik
          name='captcha'
          label=''
          type='text'
          placeholder='Enter captcha text'
        />
      </div>
      {/* Remember + Forgot */}
      <div className='flex items-center justify-between text-sm'>
        <CheckboxFormik
          name='remember'
          className='rounded border-gray-300'
          label='Remember Me'
        />

        <a
          href='/auth/forgot-password'
          className='text-blue-600 ms-10 text-nowrap hover:underline'
        >
          Forgot Password?
        </a>
      </div>

      <div className='mt-4 flex justify-center w-full'>
        <Button
          type='submit'
          className='flex justify-center items-center'
          variant='default'
        >
          Sign in <PiArrowRightBold />
        </Button>
      </div>
      {/* Sign up link */}
      <p className='text-sm text-gray-500 text-start mt-3'>
        Don’t have an account?{' '}
        <a
          href='/auth/signup'
          className='text-blue-600 font-medium hover:underline'
        >
          Sign Up
        </a>
      </p>
    </FormikForm>
  );
}
