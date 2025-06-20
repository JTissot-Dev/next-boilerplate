"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import useSignOut from "../api/use-signout";

const LogoutButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { signOut } = useSignOut();

  return (
    <>
      <Button
        variant="outline"
        size="icon" onClick={() => setIsOpen(true)}
        data-testid="logout-button"
      >
        <LogOut className="h-5 w-5" />
      </Button>
      <ConfirmDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Déconnexion"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        onConfirm={signOut}
      />
    </>
  );
};

export default LogoutButton;
