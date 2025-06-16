import LoginForm from "@/features/auth/components/LoginForm";
import AuthCard from "@/features/auth/components/AuthCard";


export default function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthCard>
          <LoginForm />
        </AuthCard>
      </div>
    </div>
  )
}