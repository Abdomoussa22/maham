import AuthWrapperOne from '../../../../packages/auth/Layout/auth-wraper-one.tsx';
import LoginForm from '../../../../packages/ui/src/components/forms/LoginForm.tsx';
import UnderlineShape from '../../../../packages/ui/src/shapes/underline.tsx';

export default function SignInPage() {
  return (
    <AuthWrapperOne
      title={
        <>
          Welcome back{' '}
          <span className='relative inline-block'>
            Sign in to
            <UnderlineShape className='absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36' />
          </span>{' '}
          continue
        </>
      }
      description='Don’t have an account yet? Sign up to get started.'
      bannerTitle='Your personalized dashboard'
      bannerDescription='Access insights, manage your profile, and explore all features with ease.'
      isSocialLoginActive={true}
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
      <LoginForm />
    </AuthWrapperOne>
  );
}
