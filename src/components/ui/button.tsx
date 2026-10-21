import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "coral";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses = {
      primary:
        "bg-blue hover:bg-blue-hover active:bg-blue-hover text-white shadow-xs border border-transparent",
      secondary:
        "bg-surface hover:bg-cloud active:bg-cloud-subtle text-ink border border-cloud-border shadow-xs",
      outline:
        "bg-transparent hover:bg-cloud active:bg-cloud-subtle text-ink-secondary border border-cloud-border",
      ghost:
        "bg-transparent hover:bg-cloud text-ink-secondary hover:text-ink border border-transparent",
      coral:
        "bg-coral hover:bg-coral-dark text-white shadow-xs border border-transparent",
    };

    const sizeClasses = {
      sm: "h-8 px-2.5 text-xs gap-1.5",
      md: "h-9 px-3.5 text-sm gap-2",
      lg: "h-11 px-5 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
