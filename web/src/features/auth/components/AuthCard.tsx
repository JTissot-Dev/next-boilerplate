import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";


const AuthCard: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {

  return (
    <div>
      <Card className="overflow-hidden p-0 mb-4">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex p-2 md:py-4 md:px-8 w-full h-[550px]">
            {children}
          </div>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/auth.jpg"
              alt="Image"
              width="600"
              height="1000"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] z-50"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default AuthCard;