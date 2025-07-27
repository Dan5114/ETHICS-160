import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'

import UpdateProfileInformation from '@/Pages/Profile/Partials/UpdateProfileInformationForm'
 import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm'
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm'

export default function Profile() {
  const { auth, mustVerifyEmail, status } = usePage().props as any

  return (
    <AuthenticatedLayout header="Profile">
      <Head title="Profile" />

      <div className="max-w-3xl mx-auto space-y-10">
        <UpdateProfileInformation
          mustVerifyEmail={mustVerifyEmail}
          status={status}
        />

        {/* Uncomment these if/when needed */}
        {/* <UpdatePasswordForm className="mt-10" /> */}
        {/* <DeleteUserForm className="mt-10" /> */}
      </div>
    </AuthenticatedLayout>
  )
}
