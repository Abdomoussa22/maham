import AuthWrapperOne from '../../../../packages/auth/Layout/auth-wraper-one.tsx';
import ForgetForm from '../../../../packages/ui/src/components/forms/ForgetPassword.tsx';
import UnderlineShape from '../../../../packages/ui/src/shapes/underline.tsx';

export default function ForgetPassword() {
  return (
    <AuthWrapperOne
      title={
        <>
          {'auth-reset-your'}{' '}
          <span className='relative inline-block'>
            {'auth-password'}
            <UnderlineShape className='absolute -bottom-2 end-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36' />
          </span>
        </>
      }
      bannerTitle={'auth-sign-up-banner-title'}
      bannerDescription={'auth-sign-up-banner-description'}
      pageImage={
        <div className='hidden w-7/12 items-center justify-center rounded-[20px] bg-gray-50 px-6 dark:bg-gray-100/40 lg:flex xl:justify-start 2xl:px-16'>
          <div className='pb-8 pt-10 text-center xl:pt-16 2xl:block 2xl:w-[1063px]'>
            <div className='relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]'>
              <img
                src='https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp'
                alt=''
                className='object-cover'
                sizes='(max-width: 768px) 100vw'
              />
            </div>
          </div>
        </div>
      }
    >
      <ForgetForm />
    </AuthWrapperOne>
  );
}
