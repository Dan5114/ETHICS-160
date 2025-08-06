import * as React from 'react';
import { FormEventHandler, useRef } from 'react';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { useForm } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface Props {
  className?: string;
}

export default function DeleteUserForm({ className = '' }: Props) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpenChange } = useDisclosure();
  const { data, setData, delete: destroy, reset, errors, clearErrors, processing } = useForm({
    password: '',
  });

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();
    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onError: () => passwordRef.current?.focus(),
      onFinish: () => reset(),
    });
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-bold text-gray-900">Delete Account</h2>

        <p className="mt-1 text-sm text-gray-600">
          Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
        </p>
      </header>

      <button
        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
        onClick={() => onOpenChange()}
      >
        Delete Account
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={deleteUser} className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Are you sure you want to delete your account?
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Please enter your password to confirm you would like to permanently delete your account.
              </p>

              <div className="mt-6">
                <InputLabel htmlFor="password" value="Password" className="sr-only" />
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordRef}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Password"
                  isFocused
                />
                <InputError className="mt-2" message={errors.password} />
              </div>

              <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={() => { onClose(); clearErrors(); reset(); }}>
                  Cancel
                </SecondaryButton>
                <DangerButton className="ms-3" disabled={processing} type="submit">
                  Delete Account
                </DangerButton>
              </div>
            </form>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
