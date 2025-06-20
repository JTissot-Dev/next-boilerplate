import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignupCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Card className="rounded-sm sm:rounded-lg py-10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl leading-3">S&apos;inscrire</CardTitle>
        <CardDescription className="text-md">
          Créez votre compte utilisateur
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SignupCard;
