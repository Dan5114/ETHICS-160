import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface Props {
  href: string;
  active?: boolean;
}

export default function NavLink({ active = false, className = '', children, ...props }: PropsWithChildren<Props & { className?: string }>) {
  return (
    <Link
      {...props}
      className={
        'inline-flex items-center px-3 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none' +
        (active
          ? ' text-gray-900 border-b-2 border-[#00572A]'
          : '') +
        className
      }
    >
      {children}
    </Link>
  );
}
