import React, { FormEvent } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      <div className="mb-6">
        <div className="flex items-center">
          <img src="/img/logo.svg" className="rounded w-30 mr-4" alt="logo" />
        </div>
      </div>

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
 <div>
  <div className="flex">
    {/* Exact icon classes */}
    <span className="icon-[tabler--mail] text-black text-opacity-55 size-6"></span>

    <InputLabel htmlFor="email" value="Faculty Email" />
  </div>

  <TextInput
    id="email"
    type="email"
    name="email"
    value={data.email}
    className="mt-1 block w-full"
    autoComplete="username"
    isFocused
    onChange={(e) => setData('email', e.target.value)}
  />

  <InputError message={errors.email} className="mt-2 text-xs" />
</div>


        <div className="mt-4">
  <div className="flex">
    <span className="icon-[tabler--lock] text-black text-opacity-55 size-6"></span>
    <InputLabel htmlFor="password" value="Password" />
  </div>

  <TextInput
    id="password"
    type="password"
    name="password"
    value={data.password}
    className="mt-1 block w-full"
    autoComplete="current-password"
    onChange={(e) => setData('password', e.target.value)}
  />

  <InputError message={errors.password} className="mt-2 text-xs" />
</div>


        <div className="mt-4 flex items-center justify-end">
  <PrimaryButton
    className="
      ms-4 w-auto 
      bg-[#006633] hover:bg-[#005C2E] 
      text-white 
      focus:ring-2 focus:ring-[#005C2E] focus:ring-offset-2
      px-4 py-2 rounded
    "
    disabled={processing}
  >
    <span className="icon-[tabler--login]"></span>&nbsp;Log in
  </PrimaryButton>

        </div>

        <div className="flex flex-col w-full lg:flex-row mt-3">
          <div className="grid flex-grow place-items-center">
            {canResetPassword && (
              <Link
  href={route('password.request')}
  className="rounded-md text-sm text-[#0000FF] hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
  Forgot password?
</Link>
            )}
          </div>

          <div className="divider lg:divider-horizontal text-neutral">or</div>


          <div className="grid flex-grow place-items-center">
            <Link
              href={route('register')}
              className="rounded-md text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="text-[#0000FF]">Register Account?</span>
            </Link>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}
