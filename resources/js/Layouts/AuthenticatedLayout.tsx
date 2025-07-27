// resources/js/Layouts/AuthenticatedLayout.tsx

import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Slide, ToastContainer } from 'react-toastify';
import { ThemeSwitcher } from '@/Components/ThemeSwitcher';

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={2}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#00582A] to-[#B6D8B9] font-sans">
        <nav className="bg-[#00582A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <Link href="/">
                  <ApplicationLogo className="h-10 w-auto" />
                </Link>
                <div className="hidden space-x-8 sm:ml-10 sm:flex">
                  <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    Dashboard
                  </NavLink>
                  <NavLink href={route('applications.index')} active={route().current('applications.index')}>
                    Applications
                  </NavLink>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <ThemeSwitcher />
                <div className="hidden sm:flex sm:items-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="light">{user.name}</Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link href={route('profile.edit')} className="block">Profile</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link method="post" href={route('logout')} className="block text-start">
                          Logout
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <button
                  onClick={() => setShowNav(prev => !prev)}
                  className="sm:hidden p-2 rounded-md text-white hover:bg-white/20 focus:outline-none"
                >
                  {showNav
                    ? <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    : <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  }
                </button>
              </div>
            </div>
          </div>

          {showNav && (
            <div className="sm:hidden bg-[#00582A]">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                  Dashboard
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('applications.index')} active={route().current('applications.index')}>
                  Applications
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('profile.edit')}>
                  Profile
                </ResponsiveNavLink>
                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                  Logout
                </ResponsiveNavLink>
              </div>
            </div>
          )}
        </nav>

        {header && (
          <header className="border-b border-white/20">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="font-custom text-2xl text-white">{header}</h1>
            </div>
          </header>
        )}

        <main className="mx-auto max-w-screen-xl sm:px-6 lg:px-8 mt-8">
          <div className="backdrop-blur-sm bg-white/60 rounded-lg p-6 shadow-lg">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
