import clsx from "clsx";
import { CircleAlert, Check, Lock } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
  focus: boolean;
}

interface StrengthResult {
  label: string;
  color: string;
  width: string;
  score: number;
  feedback: string[];
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  focus,
}) => {
  const calculateStrength = (pwd: string): StrengthResult => {
    if (!pwd)
      return {
        score: 0,
        label: "",
        color: "bg-muted",
        width: "0%",
        feedback: [],
      };

    let score: number = 0;
    const feedback: string[] = [];

    if (pwd.length >= 8) score += 1;
    else feedback.push("8 caractères minimum");

    if (/[a-z]/.test(pwd)) score += 1;
    else feedback.push("lettres minuscules");

    if (/[A-Z]/.test(pwd)) score += 1;
    else feedback.push("lettres majuscules");

    if (/\d/.test(pwd)) score += 1;
    else feedback.push("chiffres");

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 1;
    else feedback.push("caractères spéciaux");

    if (pwd.length >= 12) score += 1;

    let strength: Omit<StrengthResult, "score" | "feedback">;
    if (score <= 1) {
      strength = { label: "Très faible", color: "bg-red-500", width: "20%" };
    } else if (score <= 2) {
      strength = { label: "Faible", color: "bg-red-400", width: "40%" };
    } else if (score <= 3) {
      strength = { label: "Moyen", color: "bg-yellow-500", width: "60%" };
    } else if (score <= 4) {
      strength = { label: "Fort", color: "bg-green-500", width: "80%" };
    } else {
      strength = { label: "Très fort", color: "bg-green-600", width: "100%" };
    }

    return { ...strength, score, feedback };
  };

  const strength = calculateStrength(password);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="h-3 flex justify-between items-center mt-0.5 mb-1">
        <div className="w-[55%] bg-gray-300 rounded-full h-1 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ease-out ${strength.color}`}
            style={{ width: password ? strength.width : "0%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center leading-none mb-0.5 space-x-1.5">
          {!strength.label && (
            <Lock size={14} className="text-muted-foreground" />
          )}
          {strength.label === "Très fort" && (
            <Check size={16} className="text-green-600" strokeWidth={3} />
          )}
          <span
            className={`text-[12px] font-semibold ${strength.score === 0
                ? "text-muted-foreground"
                : strength.score > 0 && strength.score <= 2
                  ? "text-red-600"
                  : strength.score <= 3
                    ? "text-yellow-600"
                    : "text-green-600"
              }`}
          >
            {strength.label || "Robustesse"}
          </span>
        </div>
      </div>

      {focus && strength.feedback.length > 0 && (
        <div
          data-testid="password-strength-feedback"
          className={clsx(
            "absolute left-0 right-0 top-4",
            "mt-2 text-xs text-muted-foreground bg-card z-[120]",
            "p-2.5 rounded-sm shadow-sm",
            "border",
          )}
        >
          <div className="flex items-center space-x-2 mb-2">
            <CircleAlert size={15} />
            <p>Améliorez votre mot de passe avec :</p>
          </div>

          <ul className="ms-6 list-disc list-inside space-y-0.5">
            {strength.feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
