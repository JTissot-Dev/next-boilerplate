import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type LoadingButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading: boolean;
    children: React.ReactNode;
    loadingText?: string;
  };

const LoadingButton: React.FC<LoadingButtonProps> = ({
  className,
  variant,
  size,
  loading,
  children,
  loadingText,
  ...props
}) => {
  let textContent = children;
  if (loading) {
    textContent = loadingText || "Chargement...";
  }

  return (
    <Button
      {...props}
      disabled={loading}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-foreground"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {textContent}
    </Button>
  );
};

export default LoadingButton;
