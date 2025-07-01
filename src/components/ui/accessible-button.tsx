
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from './loading-spinner';

interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string;
  description?: string;
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    children, 
    ariaLabel, 
    description, 
    loading = false, 
    loadingText = "A carregar...", 
    icon,
    iconPosition = 'left',
    className,
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <Button
        ref={ref}
        className={cn(
          "focus:outline-none focus:ring-2 focus:ring-cv-blue focus:ring-offset-2 transition-all duration-200 active:scale-95",
          "hover:shadow-md disabled:shadow-none",
          className
        )}
        disabled={isDisabled}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        title={description}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" aria-label={loadingText} />
            {loadingText}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="mr-2" aria-hidden="true">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="ml-2" aria-hidden="true">{icon}</span>
            )}
          </>
        )}
      </Button>
    );
  }
);

AccessibleButton.displayName = "AccessibleButton";

export { AccessibleButton };
