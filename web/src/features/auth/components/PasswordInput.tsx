"use client";

import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";


type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••••"
          className={className}
          ref={ref}
          {...props}
        />
        <button
          data-testid="toggle-password"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {showPassword ? (
            <Eye
              size={16} strokeWidth={2}
              className="text-muted-foreground"
            />
          ) : (
            <EyeOff
              size={16} strokeWidth={2}
              className="text-muted-foreground"
            />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;