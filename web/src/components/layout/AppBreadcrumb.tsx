"use client";

import { usePathname, useRouter, useParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';


const BreadcrumbWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const AppBreadcrumb: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") {
    return (
      <BreadcrumbWrapper>
        <BreadcrumbItem>
          <BreadcrumbPage>Accueil</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbWrapper>
    )
  }

  if (pathname === '/dashboard') {
    return (
      <BreadcrumbWrapper>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            onClick={() => router.push('/')}
            className="cursor-pointer"
          >
            Accueil
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbWrapper>
    )
  }
}

export default AppBreadcrumb;
