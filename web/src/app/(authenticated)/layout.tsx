
import AuthLayoutProvider from '@/components/layout/AuthLayoutProvider';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AuthLayoutProvider>
      {children}
    </AuthLayoutProvider>
  );
}
