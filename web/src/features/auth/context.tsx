"use client";

import { createContext, useContext, useState } from "react";

type Context = {
  showEmailNotVerifyAlert: boolean;
  setEmailNotVerifyAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showEmailVerifyAlert: boolean;
  setEmailVerifyAlert: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSendResetPasswordDialog: boolean;
  setIsOpenSendResetPasswordDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const context = createContext<Context>({
  showEmailNotVerifyAlert: false,
  setEmailNotVerifyAlert: () => {},
  showEmailVerifyAlert: false,
  setEmailVerifyAlert: () => {},
  isOpenSendResetPasswordDialog: false,
  setIsOpenSendResetPasswordDialog: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showEmailNotVerifyAlert, setEmailNotVerifyAlert] =
    useState<boolean>(false);
  const [showEmailVerifyAlert, setEmailVerifyAlert] = useState<boolean>(false);
  const [isOpenSendResetPasswordDialog, setIsOpenSendResetPasswordDialog] =
    useState<boolean>(false);

  return (
    <context.Provider
      value={{
        showEmailNotVerifyAlert,
        setEmailNotVerifyAlert,
        showEmailVerifyAlert,
        setEmailVerifyAlert,
        isOpenSendResetPasswordDialog,
        setIsOpenSendResetPasswordDialog,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAuthContext = () => useContext(context);
