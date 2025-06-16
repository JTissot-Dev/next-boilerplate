"use client"

import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/query-client";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster richColors />
        <div>
          {children}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
