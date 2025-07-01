
import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  ariaLabel?: string;
  title?: string;
  onClick?: () => void;
}

const ExternalLink = ({
  href,
  children,
  className,
  showIcon = true,
  ariaLabel,
  title,
  onClick
}: ExternalLinkProps) => {
  const defaultAriaLabel = `${children} (abre numa nova janela)`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 focus-visible-cv transition-colors hover:text-cv-blue',
        className
      )}
      aria-label={ariaLabel || defaultAriaLabel}
      title={title || `Visitar ${href}`}
      onClick={onClick}
    >
      {children}
      {showIcon && (
        <ExternalLinkIcon 
          className="h-4 w-4 ml-1" 
          aria-hidden="true"
        />
      )}
    </a>
  );
};

export default ExternalLink;
