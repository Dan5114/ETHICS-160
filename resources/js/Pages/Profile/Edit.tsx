import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'

import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm'
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm'
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm'

export default function Edit() {
  const { auth, mustVerifyEmail, status } = usePage().props as any

  return (
    <AuthenticatedLayout header="Profile" user={auth.user}>
      <Head title="Profile" />

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Side by side layout: Profile Information on left, Update Password on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Left column - Profile Information */}
          <div className="min-w-0">
            <div className="bg-white shadow sm:rounded-lg h-full">
              <div className="p-8">
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                />
              </div>
            </div>
          </div>

          {/* Right column - Update Password */}
          <div className="min-w-0">
            <div className="bg-white shadow sm:rounded-lg h-full">
              <div className="p-8">
                <UpdatePasswordForm />
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account section below */}
        <div className="mt-6">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="p-8">
              <DeleteUserForm />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}