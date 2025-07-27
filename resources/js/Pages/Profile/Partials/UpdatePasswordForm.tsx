import * as React from 'react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
  className?: string;
}

export default function UpdatePasswordForm({ className = '' }: Props) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentRef = useRef<HTMLInputElement>(null);
  const [showMessage, setShowMessage] = useState(false);

  const { data, setData, put, reset, errors, processing } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowMessage(true);
      },
      onError: (errs) => {
        if (errs.current_password) {
          reset('current_password');
          currentRef.current?.focus();
        }
        if (errs.password) {
          reset('password', 'password_confirmation');
          passwordRef.current?.focus();
        }
      },
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
          <h2 className="text-lg font-medium text-base-content">Update Password</h2>
          <p className="mt-1 text-sm text-base-content/80">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </header>

        <form onSubmit={submit} className="mt-6 space-y-6">
          <div>
            <InputLabel htmlFor="current_password" value="Current Password" />
            <TextInput
              id="current_password"
              ref={currentRef}
              type="password"
              className="mt-1 block w-full"
              value={data.current_password}
              onChange={(e) => setData('current_password', e.target.value)}
              autoComplete="current-password"
              required
            />
            <InputError className="mt-2" message={errors.current_password} />
          </div>

          <div>
            <InputLabel htmlFor="password" value="New Password" />
            <TextInput
              id="password"
              ref={passwordRef}
              type="password"
              className="mt-1 block w-full"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              autoComplete="new-password"
              required
            />
            <InputError className="mt-2" message={errors.password} />
          </div>

          <div>
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
            <TextInput
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              autoComplete="new-password"
              required
            />
            <InputError className="mt-2" message={errors.password_confirmation} />
          </div>

          <div className="flex items-center gap-4">
            <PrimaryButton disabled={processing}>Save</PrimaryButton>
            {showMessage && <p className="text-sm text-success">Saved.</p>}
          </div>
        </form>
      </section>
    </div>
  );
}
