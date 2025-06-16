"use client";

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import AppBreadcrumb from './AppBreadcrumb';
import { ThemeToggle } from '../theme/ThemeToggle';
import LogoutButton from '@/features/auth/components/LogoutButton';


const Header: React.FC = () => {

  return (
    <header
      className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 backdrop-blur-md bg-opacity-50 z-50 border-b"
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AppBreadcrumb />
      </div>
      <div className="me-6 space-x-2">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  )
}

export default Header;
