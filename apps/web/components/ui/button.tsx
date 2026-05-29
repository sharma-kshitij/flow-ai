import * as React from "react";
import { cn } from "./utils";

type Variant = "default" | "secondary" | "outline" | "ghost";
type Size = "default" | "sm" | "icon";

const variantStyles: Record<Variant, string> = {
  default:
    "bg-slate-950 text-white hover:bg-slate-800 focus-visible:ring-slate-500",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200 focus-visible:ring-slate-300",
  outline:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-300",
  ghost:
    "bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300",
};

const sizeStyles: Record<Size, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 px-3 text-sm",
  icon: "h-10 w-10 p-0 text-lg",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
