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
    <div className={`backdrop-blur-sm bg-white/60 rounded-md p-6 shadow-lg ${className}`}>
      <section>
        <header>
          <h2 className="text-lg font-medium text-base-content">Profile Information</h2>
          <p className="mt-1 text-sm text-base-content/80">
            Update your account’s profile information and email address.
          </p>
        </header>

        <form onSubmit={submit} className="mt-6 space-y-6">
          <div>
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-[#00582A] focus:border-[#00582A]"
/>

            <InputError className="mt-2" message={errors.name} />
          </div>

          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              className="mt-1 block w-full"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
              autoComplete="username"
            />
            <InputError className="mt-2" message={errors.email} />
          </div>

          {mustVerifyEmail && user.email_verified_at === null && (
            <div>
              <p className="mt-2 text-sm text-base-content">
                Your email address is unverified.{' '}
                <Link
                  href={route('verification.send')}
                  method="post"
                  as="button"
                  className="ml-1 text-sm text-primary underline hover:text-primary-focus focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Click here to re-send the verification email.
                </Link>
              </p>
              {status === 'verification-link-sent' && (
                <div className="mt-2 text-sm font-medium text-success">
                  A new verification link has been sent to your email address.
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4">
            <PrimaryButton className="bg-[#00582A] hover:bg-[#004c24] text-white transition" />
            {showMessage && <p className="text-sm text-success">Saved.</p>}
          </div>
        </form>
      </section>
    </div>
  );
}
