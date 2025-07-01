
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayCardProps {
  allErrors: Array<{ name: string; error: any }>;
}

const ErrorDisplayCard: React.FC<ErrorDisplayCardProps> = ({ allErrors }) => {
  if (allErrors.length === 0) return null;

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-700 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Erros de Sistema Detectados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {allErrors.map((item, index) => (
            <div key={index} className="text-sm text-red-600">
              <strong>{item.name}:</strong> {item.error?.message || 'Erro desconhecido'}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorDisplayCard;
