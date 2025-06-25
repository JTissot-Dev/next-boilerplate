"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useAuthContext } from "../context";
import EmailNotVerifyAlert from "./EmailNotVerifyAlert";
import EmailVerifyAlert from "./EmailVerifyAlert";
import SendResetPasswordDialog from "./SendResetPasswordDialog";

const LoginCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    showEmailNotVerifyAlert,
    setEmailNotVerifyAlert,
    showEmailVerifyAlert,
    setEmailVerifyAlert,
    isOpenSendResetPasswordDialog,
    setIsOpenSendResetPasswordDialog,
  } = useAuthContext();

  return (
    <div>
      <EmailNotVerifyAlert
        showAlert={showEmailNotVerifyAlert}
        setShowAlert={setEmailNotVerifyAlert}
      />
      <EmailVerifyAlert
        showAlert={showEmailVerifyAlert}
        setShowAlert={setEmailVerifyAlert}
      />
      <SendResetPasswordDialog
        isOpenDialog={isOpenSendResetPasswordDialog}
        setIsOpenDialog={setIsOpenSendResetPasswordDialog}
      />
      <Card className="overflow-hidden p-0 rounded-sm sm:rounded-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex px-6 w-full">{children}</div>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/auth.jpg"
              alt="Image"
              width={600}
              height={1000}
              priority={true}
              quality={80}
              placeholder="blur"
              blurDataURL="/auth-lr.jpg"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] z-50"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginCard;
