import React, { ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

interface GuestLayoutProps {
  children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div
      className="flex min-h-screen items-center sm:justify-center sm:pt-0 bg-no-repeat bg-cover overflow-hidden"
      style={{ backgroundImage: "url(https://aims.usls.edu.ph/lasalle/images/pwu_taft.png)" }}
    >
      <div className="w-full overflow-hidden card glass p-3 shadow-lg sm:max-w-md sm:rounded-lg">
        <div className="bg-white opacity-90 rounded px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
