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
    <section>
      <header>
        <h2 className="text-lg font-bold text-gray-900">Update Password</h2>
        <p className="mt-1 text-sm text-gray-600">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <div>
          <InputLabel htmlFor="current_password" value="Current Password" className="text-sm font-medium text-gray-700" />
          <TextInput
            id="current_password"
            ref={currentRef}
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00572A] focus:ring-[#00572A] sm:text-sm"
            value={data.current_password}
            onChange={(e) => setData('current_password', e.target.value)}
            autoComplete="current-password"
            required
          />
          <InputError className="mt-2" message={errors.current_password} />
        </div>

        <div>
          <InputLabel htmlFor="password" value="New Password" className="text-sm font-medium text-gray-700" />
          <TextInput
            id="password"
            ref={passwordRef}
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00572A] focus:ring-[#00572A] sm:text-sm"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            autoComplete="new-password"
            required
          />
          <InputError className="mt-2" message={errors.password} />
        </div>

        <div>
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-sm font-medium text-gray-700" />
          <TextInput
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00572A] focus:ring-[#00572A] sm:text-sm"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            autoComplete="new-password"
            required
          />
          <InputError className="mt-2" message={errors.password_confirmation} />
        </div>

        <div className="flex items-center gap-4">
          <button 
            type="submit"
            disabled={processing}
            className="bg-[#00572A] hover:bg-[#004c24] text-white px-2 py-1 rounded-md text-sm font-medium transition-colors h-10 w-20 flex items-center justify-center"
          >
            SAVE
          </button>
          {showMessage && <p className="text-sm text-green-600">Saved.</p>}
        </div>
      </form>
    </section>
  );
}
