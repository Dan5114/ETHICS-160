import * as React from 'react';
import { FormEventHandler, useEffect, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}

export default function UpdateProfileInformationForm({
  mustVerifyEmail,
  status,
  className = '',
}: Props) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing } = useForm({
    name: user.name,
    email: user.email,
  });
  const [showMessage, setShowMessage] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('profile.update'), {
      onSuccess: () => setShowMessage(true),
    });
  };

  useEffect(() => {
    if (showMessage) {
      const t = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showMessage]);

  return (
    <section>
      <header>
        <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <div>
          <InputLabel htmlFor="name" value="Name" className="text-sm font-medium text-gray-700" />
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00572A] focus:ring-[#00572A] sm:text-sm"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoFocus
          />
          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" className="text-sm font-medium text-gray-700" />
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00572A] focus:ring-[#00572A] sm:text-sm"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete="username"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>

        {/* Invisible field to match Update Password form structure */}
        <div>
          <InputLabel htmlFor="invisible_field" value=" " className="text-sm font-medium text-gray-700 opacity-0" />
          <div className="mt-1 block w-full opacity-0" style={{ height: '3.8rem' }}></div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <button 
            type="submit"
            disabled={processing}
            className="bg-[#00572A] hover:bg-[#004c24] text-white px-2 py-1 rounded-md text-sm font-medium transition-colors h-10 w-20 flex items-center justify-center"
          >
            SAVE
          </button>
          {showMessage && <p className="text-sm text-green-600">Saved.</p>}
        </div>

        {/* Email verification section moved after button */}
        {mustVerifyEmail && user.email_verified_at === null && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Your email address is unverified.{' '}
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="ml-1 text-sm text-[#00572A] underline hover:text-[#004c24] focus:outline-none focus:ring-2 focus:ring-[#00572A]"
              >
                Click here to re-send the verification email.
              </Link>
            </p>
            {status === 'verification-link-sent' && (
              <div className="mt-2 text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}
      </form>
    </section>
  );
}