import SignupForm from "@/features/auth/components/SignupForm";
import SignupCard from "@/features/auth/components/SignupCard";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-2 md:p-10">
      <div className="w-full max-w-sm">
        <SignupCard>
          <SignupForm />
        </SignupCard>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 mt-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
