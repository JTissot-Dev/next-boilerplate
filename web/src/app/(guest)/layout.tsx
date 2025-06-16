import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
