import SignupForm from "@/features/auth/components/SignupForm";
import SignupCard from "@/features/auth/components/AuthCard";


export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupCard>
          <SignupForm />
        </SignupCard>
      </div>
    </div>
  )
}