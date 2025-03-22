
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'okay' | 'dealbreaker';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, isLoading, ...props }, ref) => {
    // Base classes
    const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none";
    
    // Size classes
    const sizeClasses = {
      default: "h-10 px-6 py-2 text-sm",
      sm: "h-8 px-4 py-1 text-xs",
      lg: "h-14 px-8 py-3 text-base",
      icon: "h-10 w-10"
    };
    
    // Variant classes
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      outline: "border border-input bg-transparent hover:bg-secondary hover:text-secondary-foreground",
      ghost: "hover:bg-secondary",
      okay: "bg-okay text-white hover:bg-okay-dark shadow-sm",
      dealbreaker: "bg-dealbreaker text-white hover:bg-dealbreaker-dark shadow-sm"
    };
    
    return (
      <button
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          isLoading && "cursor-progress opacity-80",
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
