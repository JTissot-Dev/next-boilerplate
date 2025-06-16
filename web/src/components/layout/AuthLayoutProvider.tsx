"use client"

import {
  SidebarInset,
  SidebarProvider
} from '@/components/ui/sidebar';
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";


export default function AuthLayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <SidebarProvider>
      <Toaster richColors />
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="px-10 py-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
