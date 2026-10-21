import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-ink-subtle">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-cloud-border bg-surface px-3 py-1.5 text-sm text-ink placeholder:text-ink-subtle",
            "transition-colors outline-none",
            "hover:border-slate-300",
            "focus:border-blue focus:ring-2 focus:ring-blue/15",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-9",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
