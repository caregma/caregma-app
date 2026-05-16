import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "teal" | "secondary" | "ghost";
type Size = "default" | "sm" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  teal: "btn-teal",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const sizeClass: Record<Size, string> = {
  default: "",
  sm: "btn-sm",
  lg: "btn-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn("btn", variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
