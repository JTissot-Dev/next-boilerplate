import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AuthContextProvider } from "@/features/auth/context";

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <div>
        <div className="fixed top-4 right-4">
          <ThemeToggle />
        </div>
        {children}
      </div>
    </AuthContextProvider>
  );
}
