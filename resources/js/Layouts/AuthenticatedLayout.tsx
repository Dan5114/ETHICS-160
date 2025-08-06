// resources/js/Layouts/AuthenticatedLayout.tsx

import React, { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Slide, ToastContainer } from 'react-toastify';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: any; header?: React.ReactNode }>) {
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

      <div className="min-h-screen bg-white font-sans">
        {/* Top Navigation Bar */}
        <nav className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <Link href="/" className="mr-16">
                  <ApplicationLogo className="h-10 w-auto" />
                </Link>
                <div className="hidden space-x-10 sm:ml-40 sm:flex">
                  <NavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </NavLink>
                  <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                    </svg>
                    Dashboard
                  </NavLink>
                  <NavLink href={route('applications.index')} active={route().current('applications.*')}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    CRE
                  </NavLink>
                  <NavLink href="#" active={false}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    Faculty
                  </NavLink>
                  <NavLink href="#" active={false}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Reports
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex sm:items-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        variant="light" 
                        className="text-gray-900 font-medium hover:text-gray-700"
                      >
                        {user.name}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User menu">
                      <DropdownItem key="profile">
                        <Link href={route('profile.edit')} className="w-full">
                          Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="logout">
                        <Link href={route('logout')} method="post" as="button" className="w-full">
                          Logout
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <button
                  onClick={() => setShowNav(prev => !prev)}
                  className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {showNav && (
            <div className="sm:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                  Profile
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                  Dashboard
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('applications.index')} active={route().current('applications.*')}>
                  CRE
                </ResponsiveNavLink>
                <ResponsiveNavLink href="#" active={false}>
                  Faculty
                </ResponsiveNavLink>
                <ResponsiveNavLink href="#" active={false}>
                  Reports
                </ResponsiveNavLink>
                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                  Logout
                </ResponsiveNavLink>
              </div>
            </div>
          )}
        </nav>
        
        {/* Page Title Header */}
        {header && (
          <header className="bg-[#00572A]">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-2xl text-white text-left">{header}</h1>
            </div>
          </header>
        )}
        
        {/* Main Content with Indentation */}
        <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </>
  );
}
