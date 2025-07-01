
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

interface FormValidationProps {
  value: string;
  rules: ValidationRule[];
  className?: string;
  showOnFocus?: boolean;
}

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

const FormValidation = ({ 
  value, 
  rules, 
  className,
  showOnFocus = true 
}: FormValidationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState<Array<{ rule: ValidationRule; passed: boolean }>>([]);

  useEffect(() => {
    const validationResults = rules.map(rule => ({
      rule,
      passed: rule.test(value)
    }));
    setResults(validationResults);
  }, [value, rules]);

  const allPassed = results.every(result => result.passed);
  const hasValue = value.length > 0;

  if (!showOnFocus && !hasValue) return null;

  return (
    <div className={cn("mt-2 space-y-1", className)}>
      {results.map((result, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center text-xs gap-2 transition-colors",
            result.passed ? "text-green-600" : "text-red-500"
          )}
        >
          {result.passed ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <XCircle className="w-3 h-3" />
          )}
          <span>{result.rule.message}</span>
        </div>
      ))}
    </div>
  );
};

// Common validation rules
export const validationRules = {
  email: {
    test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Email deve ter formato válido'
  },
  minLength: (min: number) => ({
    test: (value: string) => value.length >= min,
    message: `Mínimo ${min} caracteres`
  }),
  maxLength: (max: number) => ({
    test: (value: string) => value.length <= max,
    message: `Máximo ${max} caracteres`
  }),
  required: {
    test: (value: string) => value.trim().length > 0,
    message: 'Campo obrigatório'
  },
  strongPassword: {
    test: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    message: 'Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo'
  },
  phone: {
    test: (value: string) => /^[+]?[\d\s-()]{7,15}$/.test(value),
    message: 'Número de telefone deve ser válido'
  }
};

export default FormValidation;
