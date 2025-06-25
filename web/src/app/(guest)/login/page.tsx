import LoginForm from "@/features/auth/components/LoginForm";
import LoginCard from "@/features/auth/components/LoginCard";

export default function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-2 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginCard>
          <LoginForm />
        </LoginCard>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 mt-4">
          En cliquant sur « Continuer », vous acceptez nos{" "}
          <a href="#">Conditions d&apos;utilisation</a> et notre{" "}
          <a href="#">Politique de confidentialité</a>.
        </div>
      </div>
    </div>
  );
}
