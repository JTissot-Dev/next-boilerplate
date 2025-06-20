import { Button, buttonVariants } from "../ui/button";
import { Loader2Icon } from "lucide-react";
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
      {loading && <Loader2Icon className="animate-spin" />}
      {textContent}
    </Button>
  );
};

export default LoadingButton;
